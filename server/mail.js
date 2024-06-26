const nodemailer = require('nodemailer');
const config = require('./config.json');

const transporter = nodemailer.createTransport({
    service: config.Mail.MAIL_SERVICE,
    //host: config.Mail.MAIL_HOST,
    //port: config.Mail.MAIL_PORT,
    //secure: true,
    auth: {
        user: config.Mail.MAIL_ADDRESS,
        pass: config.Mail.MAIL_PASSWORD
    },

    /*secureConnection: 'true',
    tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
    }*/
});

function generatePassword() {
    let chars = "0123456789";
    let passwordLength = 15;
    let password = "";
    for (let i = 0; i <= passwordLength; i++) {
        let randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber +1);
    }
    return password;
}

function sendMail(mail, username){

    let password = generatePassword();
    let mailOptions = {
        from: config.Mail.MAIL_ADDRESS,
        to: mail,
        subject: config.Mail.MAIL_CONFIRM_SIGIN_SUBJECT,
        html: `Per confermare l'account fai accesso al seguente link: ${config.ServerSetting.SERVER_URL}:${config.ServerSetting.PORT}/api/verificationRequest/${username}/${password}"`
    };

    transporter.sendMail(mailOptions, function(error, info){

        if (error) {
          console.log(error);
          return undefined;
        }         else {
          console.log('Email sent: ' + info.response);
        }
      });

      return password;
}

exports.sendMail = sendMail;