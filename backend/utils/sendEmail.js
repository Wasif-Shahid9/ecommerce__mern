const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmailMailer = async ({ email, subject, text }) => {
  ("user email: ", email);

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: process.env.SMPT_PORT,
      secure: false,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });

    // ("email sent sucessfully");
  } catch (error) {
    (error, "email not sent");
  }
};

module.exports = sendEmailMailer;
