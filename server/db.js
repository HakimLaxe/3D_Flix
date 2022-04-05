'use strict';

const mysql = require('mysql');
const bcrypt = require('bcrypt');
const config = require('./config.json');

const connection = mysql.createConnection({
    host: config.Database.DB_HOST,
    user: config.Database.DB_USER,
    password: config.Database.DB_PASSWORD,
    database: config.Database.DB_NAME,
});
  
connection.connect(function(err) {
    if (err) {
        console.log("Cannot establish a connection with the Database");
        throw err;
    }
    else console.log("Connected to the Database!");
});

const createUser = function (row) {

    return { username: row.Nickname, password: row.PasswordHash, name: row.Name, surname: row.Surname, mail: row.Mail, city: row.City, prov: row.Prov };
}

function getUser(username) {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM User WHERE Nickname = ?';
        
        connection.query(sql, [username] ,function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }
            if (result.length === 0 ){
                resolve(undefined);
            }
            else {
                const user = createUser(result[0]);
                resolve(user);    
            }
        });
    });
};

function verifySiginCredential (username, mail) {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM User WHERE Nickname = ? OR Mail = ?';
        
        connection.query(sql, [username, mail] ,function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }
            if (result.length === 0 ){
                resolve(true);
            }
            else {
                resolve(false);    
            }
        });
    });
};

function checkPassword(user, password){

    return bcrypt.compare(password, user.password);
}

exports.getUser = getUser;
exports.verifySiginCredential = verifySiginCredential;
exports.checkPassword = checkPassword;
