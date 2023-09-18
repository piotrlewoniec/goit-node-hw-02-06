const nodemailer = require("nodemailer");
require("dotenv").config();
const user = process.env.usergmail;
const pass = process.env.appgooglepass;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

const sendEmail = async ({ email, verificationToken, hostAddress }) => {
  const mailOptions = {
    from: user,
    sender: "Contacts api registration confirm",
    to: email,
    subject: "Registration confirmation API contacts sent by nodemailer",
    text: `Confirm registration by visiting followng link ${hostAddress}/api/v3/users/verify/${verificationToken}`,
    html: `<p>Confirm registration by clicking followng link</p><a href=" ${hostAddress}/api/v3/users/verify/${verificationToken}">Registration confirm</a>`,
  };
  try {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        console.log(
          "Message sent messageId: %s",
          info.messageId,
          "envelope",
          info.envelope,
          "accepted",
          info.accepted,
          "rejected",
          info.rejected,
          "pending",
          info.pending,
          "response",
          info.response
        );
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendEmail };
