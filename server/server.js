'use strict';

//import express
const express = require('express');
const morgan = require('morgan'); // logging middleware
const cors = require('cors')
const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');
const jwtSecret = '6xvL4xkAAbG49hcXf5GIYSvkDICiUAR6EdR5dLdwW7hMzUjjMUe9t6M5kSAYxsvX';
const expireTime = 300; //seconds
// Authorization error
const authErrorObj = { errors: [{  'param': 'Server', 'msg': 'Authorization error' }] };
//create application
const app = express();
const port = 3001;

app.use(cors())
app.use(express.json());

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password"
  });
  
con.connect(function(err) {
    if (err) console.log("Cannot establish a connection with the Database");
    else console.log("Connected to the Database!");
  })

app.listen(port, ()=>console.log(`Server running on http://localhost:${port}/`));

app.post('/api/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log("Received login request: " + username + " " + password)
  res.json("Login correctly Performed");
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