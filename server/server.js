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
const port = 3001;
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

//db.verifySiginCredential("3DFLLLL","POPPETTINO").then(user => console.log(user));
mailHandler.sendMail("lucafumarola96@gmail.com");

app.listen(port, ()=>console.log(`Server running on http://localhost:${port}/`));

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
          if(!db.checkPassword(user, password)){
              res.status(401).send({
                  errors: [{ 'param': 'Server', 'msg': 'Wrong password' }] 
                });
          } else {
              //AUTHENTICATION SUCCESS
              const token = jsonwebtoken.sign({ user: user.Username }, jwtSecret, {expiresIn: expireTime});
              res.cookie('token', token, { httpOnly: true, sameSite: true, maxAge: 1000*expireTime });
              res.json({username: user.username});
          }
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

  console.log(`Received sigin request:
              username ${username} password ${password}
              name ${name} surname ${surname}
              mail ${mail} city ${city} prov ${prov}`)

  res.json("Sigin correctly Performed");
});

app.use(cookieParser());

app.post('/api/logout', (req, res) => {
    res.clearCookie('token').end();
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