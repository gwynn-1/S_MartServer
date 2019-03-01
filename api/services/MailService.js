var nodemailer = require('nodemailer');

module.exports = {
    Sendmail:function(subject,html_email,toEmail){
        
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: sails.config.mail.username,
            pass: sails.config.mail.password
            }
        });

        var mailOptions = {
            from: "S-Mart <"+ sails.config.mail.username+">",
            to: toEmail,
            subject: subject,
            html: html_email
          };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
        }); 
    }
};