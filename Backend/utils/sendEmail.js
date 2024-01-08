const nodeMailer = require('nodemailer');
const { SMT_SERVICE } = require('../config/index')
const { SMPT_MAIL } = require('../config/index')
const { SMPT_PASSWORD } = require('../config/index')
const { SMPT_HOST } = require('../config/index')
const { SMPT_PORT } = require('../config/index')

const sendEmail = async (options) => {
  console.log("yes")
  // Create a nodemailer transporter using the provided SMTP server configuration.
  
  var transporter = nodeMailer.createTransport({
    host: SMPT_HOST,
    port: SMPT_PORT,
    service: 'gmail',
    auth: {
      user: SMPT_MAIL,
      pass: SMPT_PASSWORD
    }
  });
  // Define the email options, including sender, recipient, subject, and message.

  var mailOptions = {
    from: SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  // Send the email using the transporter and provided options.


  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}

module.exports = sendEmail