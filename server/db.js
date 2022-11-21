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

    return { username: row.Nickname, password: row.PasswordHash, name: row.Name, surname: row.Surname, mail: row.Mail, type: row.Type, /*city: row.City, prov: row.Prov*/ };
}

/*
const createPrinter = function (row) {

    return { username: row.Nickname, password: row.PasswordHash, name: row.Name, surname: row.Surname, mail: row.Mail, type: row.Type, city: row.City, prov: row.Prov };
}
*/

const createMessages = function (rows) {

    let messages = []
    rows.map( row => messages.push({ id: row.messageID, src: row.srcNickname, dest: row.destNickname, message : row.messageContent}))
    return messages;
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

/*
function getPrinter(username) {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM Printer WHERE Nickname = ?';
        
        connection.query(sql, [username] ,function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }
            if (result.length === 0 ){
                resolve(undefined);
            }
            else {
                const user = createPrinter(result[0]);
                resolve(user);    
            }
        });
    });
};
*/

function verifySiginCredential (username, mail) {       //USER
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

/*
function verifySiginCredential (username, mail) {       //PRINTER
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM Printer WHERE Nickname = ? OR Mail = ?';
        
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
*/

function insertUser (name, surname, username, password, mail, /*city, prov*/) {
    return new Promise((resolve, reject) => {
        let sql = 'INSERT INTO User(Name,Surname, NickName, PasswordHash, Mail, City, Prov) VALUES(?,?,?,?,?,?,?)';
        
        connection.query(sql, [name, surname, username, password, mail, city, prov] ,function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                resolve(true);    
            }
        });
    });
};

/*
function insertPrinter (name, surname, username, password, mail, city, prov) {
    return new Promise((resolve, reject) => {
        let sql = 'INSERT INTO Printer(Name,Surname, NickName, PasswordHash, Mail, City, Prov) VALUES(?,?,?,?,?,?,?)';
        
        connection.query(sql, [name, surname, username, password, mail, city, prov] ,function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                resolve(true);    
            }
        });
    });
};
*/

function insertValidateUser (username, activationCode){
    return new Promise((resolve, reject) => {
        let sql = 'INSERT INTO ValidateUser(Nickname, ActivationCode) VALUES(?,?)';
        
        connection.query(sql, [username, activationCode] ,function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }

            else {
                resolve(true);    
            }
        });
    });
};

/*
function insertValidatePrinter (username, activationCode){
    return new Promise((resolve, reject) => {
        let sql = 'INSERT INTO ValidatePrinter(Nickname, ActivationCode) VALUES(?,?)';
        
        connection.query(sql, [username, activationCode] ,function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }

            else {
                resolve(true);    
            }
        });
    });
};
*/

function getValidationCode/*User*/ (username){
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM ValidateUser WHERE Nickname = ?';
        
        connection.query(sql, [username] ,function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }
            if (result.length === 0 ){
                resolve(false);
            }
            else {
                resolve(result[0].ActivationCode);    
            }
        });
    });
};

/*
function getValidationCode (username){
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM ValidatePrinter WHERE Nickname = ?';
        
        connection.query(sql, [username] ,function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }
            if (result.length === 0 ){
                resolve(false);
            }
            else {
                resolve(result[0].ActivationCode);    
            }
        });
    });
};
*/

function deleteValidatedUser (username){
    return new Promise((resolve, reject) => {
        let sql = 'DELETE FROM ValidateUser WHERE Nickname = ?'
        
        connection.query(sql, [username] ,function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }
            else
                resolve(true);

        });
    });
};

/*
function deleteValidatedPrinter (username){
    return new Promise((resolve, reject) => {
        let sql = 'DELETE FROM ValidatePrinter WHERE Nickname = ?'
        
        connection.query(sql, [username] ,function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }
            else
                resolve(true);

        });
    });
};
*/

function updateMail (username, mail){
    return new Promise((resolve, reject) => {
        let sql = 'UPDATE User SET Mail = ? WHERE Nickname = ?'
        
        connection.query(sql, [mail,username] ,function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }
            else
                resolve(true);

        });
    });
};

function getUserMessages(username){
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM Message WHERE srcNickname = ? OR destNickname = ?'
        
        connection.query(sql, [username, username] ,function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }
            else{
                const messages = createMessages(result);
                resolve(messages); 
            }
        });
    });    
};

function insertMessage (srcUsername, destUsername, message){
    return new Promise((resolve, reject) => {
        let sql = 'INSERT INTO Message(srcNickname,destNickname,messageContent) VALUES(?,?,?)';
        
        connection.query(sql, [srcUsername,destUsername,message] ,function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }

            else {
                resolve(true);    
            }
        });
    });
};

function encryptPassword(password){
    let hash = bcrypt.hashSync(password, 10);
    return hash;
}

function checkPassword(user, password){
    return bcrypt.compare(password, user.password);
}

//NON SI SA SE SO GIUSTE

function insertIbanInfo (namePay, ibanPay) {
    return new Promise((resolve, reject) => {
        let sql = 'INSERT INTO PrinterIbanInfo(namePay, ibanPay) VALUES(?,?)';

        connection.query(sql, [namePay, ibanPay], function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                resolve(true);
            }
        });
    });
};

function insertPPInfo (ppPay) {
    return new Promise((resolve, reject) => {
        let sql = 'INSERT INTO PrinterPPInfo(ppPay) VALUES(?)';

        connection.query(sql, [ppPay], function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                resolve(true);
            }
        });
    });
};

function getIbanInfo(ibanPay) {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM PrinterIbanInfo WHERE ibanPay = ?';

        connection.query(sql, [ibanPay], function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }
            if (result.length === 0) {
                resolve(false);
            } else {
                resolve(result[0].ActivationCode);
            }
        });
    });
};


exports.getUser = getUser;
exports.verifySiginCredential = verifySiginCredential;
exports.checkPassword = checkPassword;
exports.encryptPassword = encryptPassword;
exports.insertUser = insertUser;
exports.insertValidateUser = insertValidateUser;
exports.getValidationCode = getValidationCode;
exports.deleteValidatedUser = deleteValidatedUser;
exports.updateMail = updateMail;
exports.getUserMessages = getUserMessages;
exports.insertMessage = insertMessage;

//NON SI SA SE SO GIUSTE
exports.insertIbanInfo = insertIbanInfo;
exports.getIbanInfo = getIbanInfo;
exports.insertPPInfo = insertPPInfo;
