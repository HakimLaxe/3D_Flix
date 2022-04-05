const nodemailer = require('nodemailer');
const config = require('./config.json');

const transporter = nodemailer.createTransport({
    //service: config.Mail.MAIL_SERVICE,
    host: config.Mail.MAIL_HOST,
    port: config.Mail.MAIL_PORT,
    secure: true,
    auth: {
        user: config.Mail.MAIL_ADDRESS,
        pass: config.Mail.MAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false,
    },
    /*secureConnection: 'true',
    tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
    }*/
});

function generatePassword() {
    let chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let passwordLength = 12;
    let password = "";
    for (let i = 0; i <= passwordLength; i++) {
        let randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber +1);
    }
    return password;
}

function sendMail(mail){

    let password = generatePassword();
    let mailOptions = {
        from: config.Mail.MAIL_ADDRESS,
        to: mail,
        subject: config.Mail.MAIL_CONFIRM_SIGIN_SUBJECT,
        text: `Per confermare l'account fai accesso con la seguente password temporanea: <h1>${password}</h1>`
    };

    transporter.sendMail(mailOptions, function(error, info){

        if (error) {
          console.log(error);
          return undefined;
        } else {
          console.log('Email sent: ' + info.response);
          return password;
        }
      });

}

exports.sendMail = sendMail;