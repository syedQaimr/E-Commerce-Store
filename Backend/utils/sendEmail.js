const nodeMailer = require('nodemailer');
const {SMT_SERVICE} = require('../config/index')
const {SMPT_MAIL} = require('../config/index')
const {SMPT_PASSWORD} = require('../config/index')
const {SMPT_HOST} = require('../config/index')
const {SMPT_PORT} = require('../config/index')

const sendEmail = async (options)=>{
    var transporter = nodeMailer.createTransport({
        host : SMPT_HOST,
        port : SMPT_PORT,
        service: 'gmail',
        auth: {
          user: SMPT_MAIL,
          pass: SMPT_PASSWORD
        }
      });
      
      var mailOptions = {
        from: SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

}

module.exports = sendEmail