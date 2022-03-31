'use strict';

const bcrypt = require('bcrypt');
const moment = require('moment');
const mysql = require('mysql');


const createUser = function (row) {

    return { username: row.Nickname, password: row.PasswordHash, name: row.Name, surname: row.Surname, mail: row.Mail, city: row.City, prov: row.Prov };
}

exports.getUser = function (connection, username) {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM `3D-Flix`.User WHERE Nickname = ' + mysql.escape(username);
        
        connection.query(sql, function (err, result) {
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

exports.checkPassword = function(user, password){

    return bcrypt.compare(password, user.password);
}