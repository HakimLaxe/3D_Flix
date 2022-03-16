'use strict';

//import express
const express = require('express');
const morgan = require('morgan'); // logging middleware
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

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password"
  });
  
con.connect(function(err) {
    if (err) console.log("Cannot establish a connection with the Database");
    else console.log("Connected to the Database!");
  })

app.listen(port, ()=>console.log(`Server running on http://localhost:${port}/`));
