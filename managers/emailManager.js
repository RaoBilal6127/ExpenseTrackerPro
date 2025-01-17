const nodemailer = require("nodemailer");

const emailManager = async (to, text, html, subject) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "a227b6bad0ed44",
      pass: "f956f8165ec412",
    },
  });
  await transport.sendMail({
    to: to,
    from: "info@expensetracker.com",
    text: text,
    subject: subject,
    html: html,
  });
};
module.exports = emailManager;
