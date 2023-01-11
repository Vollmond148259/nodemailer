require('dotenv').config();
const nodemailer = require('nodemailer');
let email = process.env.EMAIL;
let pass = process.env.PASSWORD;
let destination = process.env.DESTINATION_MAIL;

// async..await is not allowed in global scope, must use a wrapper
async function main(imageName) {
  //console.log(process.env.PASSWORD);
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport

  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.PORT,
    secure: true,

    auth: {
      // user: process.env.EMAIL, // generated ethereal user
      // pass: process.env.PASSWORD, // generated ethereal password
      user: email,
      pass: pass,
    },
  });

  // send mail with defined transport object
  transporter.sendMail({
    from: email, // sender address
    to: destination, // list of receivers
    subject: 'hello', // Subject line
    text: 'hello world', // plain text body
    attachments: [
      {
        filename: `${imageName}.jpeg`,
        path: `img/${imageName}.jpeg`,
        cid: email,
      },
    ],
  });
  console.log(` send mail from ${email}, to ${destination}`);
}
let i = 1;
setInterval(() => {
  if (i >= 18) {
    i = 1;
  }
  main(i).catch(console.error);
  i += 1;
}, 8000);
