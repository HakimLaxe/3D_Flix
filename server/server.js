'use strict';
//import express
const express = require('express');
const morgan = require('morgan'); // logging middleware
const cors = require('cors')
const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
const mysql = require('mysql');
const config = require('./config.json');
const db = require('./db');
const mailHandler = require('./mail');
//const userDao = require('./user_dao');
const jwtSecret = '6xvL4xkAAbG49hcXf5GIYSvkDICiUAR6EdR5dLdwW7hMzUjjMUe9t6M5kSAYxsvX';
const expireTime = 300; //seconds
// Authorization error
const authErrorObj = { errors: [{  'param': 'Server', 'msg': 'Authorization error' }] };
//create application
const app = express();
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

app.listen(config.ServerSetting.PORT,()=>console.log(`Server running on ${config.ServerSetting.SERVER_URL}:${config.ServerSetting.PORT}/`));

app.post('/api/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.getUser(username)
    .then((user) => {
      if(user === undefined) {
          res.status(404).send({
              errors: [{ 'param': 'Server', 'msg': 'Invalid user' }] 
            });
      } else {
          db.checkPassword(user, password).then( result => {
              if (!result){
                res.status(401).send({
                  errors: [{ 'param': 'Server', 'msg': 'Wrong password' }] 
                });
              }
              else {
                //AUTHENTICATION SUCCESS
                const token = jsonwebtoken.sign({ user: user.Username }, jwtSecret, {expiresIn: expireTime});
                res.cookie('token', token, { httpOnly: true, sameSite: true, maxAge: 1000*expireTime });
                res.json({username: user.username});
            }
          }) 
      } 
    }).catch(
      // Delay response when wrong user/pass is sent to avoid fast guessing attempts
      (err) => {
          new Promise((resolve) => {setTimeout(resolve, 1000)}).then(() => res.status(401).json(authErrorObj))

      }
    );
});

app.post('/api/sigin', (req, res) => {
  
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  const surname = req.body.surname;
  const mail = req.body.mail;
  const city = req.body.city;
  const prov = req.body.prov;

  db.verifySiginCredential(username, mail).then((result) => {
      if (result){
          let passwordHash = db.encryptPassword(password);
          db.insertUser(name, surname, username, passwordHash, mail, city, prov)
            .then( () => {
              let code = mailHandler.sendMail(mail, username);
              db.insertValidateUser(username,code).then( (insertReturnValue) => {
                res.json(insertReturnValue);
              });
            })
            .catch( (err) => {
              console.log(err);
              res.status(500).json({
                errors: [{'msg': err}],
             });
            });  
      }
  })
  .catch(
    // Delay response when wrong user/pass is sent to avoid fast guessing attempts
    (err) => {
        console.log("Error Catched in /api/sigin")
        new Promise((resolve) => {setTimeout(resolve, 1000)}).then(() => res.status(401).json(authErrorObj))
    }
  );

});

app.get('/api/verifyUser/:user', (req,res) => {
  db.getValidationCode(req.params.user)
    .then( code => {
        if (!code){
          res.json({"verification": true});
        }
        else{
          res.json({"verification": false});
        }
    });
});

app.get('/api/verificationRequest/:user/:code', (req,res) => {
  db.getValidationCode(req.params.user)
    .then( code => {
        if ( code == req.params.code ){
          db.deleteValidatedUser(req.params.user)
            .then( deleteResult => {
              if (deleteResult)
              res.json({"verificationRequest": true});
            });
        }
        else{
          res.json({"verificationRequest": false});
        }
    })
});

app.use(cookieParser());

app.post('/api/logout', (req, res) => {
    res.clearCookie('token').end();
});

app.get('/api/user/getChats/:user', (req,res) => {
  db.getUserMessages(req.params.user)
    .then( chats => {

        let messageListeners = []
        let chatsContent = []
        let chatsMap = new Map();
        chats.map( chat => chat.src === req.params.user ? messageListeners.push(chat.dest) : messageListeners.push(chat.src) )
        messageListeners = [...new Set(messageListeners)];
        for ( let messageListener of messageListeners ){
          chats.map( chat => {
            if ( chat.src === messageListener  )
                chatsContent.push({type: 'R', message: chat.message})
            
            if ( chat.dest === messageListener )
                chatsContent.push({type: 'S', message: chat.message})
          });
      
          chatsMap.set(messageListener, chatsContent)
          chatsContent = []
        }
        const json = JSON.stringify(Object.fromEntries(chatsMap));
        res.json(json);
    })

    .catch( (err) => {
        console.log(err);
        res.status(500).json({
          errors: [{'msg': err}],
      });
    });  

});

app.post('/api/user/insertMessage', (req, res) => {
  
  const srcUsername = req.body.srcUsername;
  const destUsername = req.body.destUsername;
  const message = req.body.messageContent;

  db.insertMessage(srcUsername,destUsername,message).then((result) => {
    res.json({"insertMessage": true});
  })
  .catch(
    // Delay response when wrong user/pass is sent to avoid fast guessing attempts
    (err) => {
        console.log("Error Catched in /api/user/insertMessage")
        new Promise((resolve) => {setTimeout(resolve, 1000)}).then(() => res.status(401).json(authErrorObj))
    }
  );
});

// For the rest of the code, all APIs require authentication
app.use(
    jwt({
      secret: jwtSecret,
      algorithms: ['RS256'],
      getToken: req => req.cookies.token
    })
  );



  // To return a better object in case of errors
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(403).json(authErrorObj);
    }
  });