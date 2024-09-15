import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "kikobilas123@gmail.com",
    pass: process.env.APP_PASSWORD,
  },
});

const emailActivate = {
  from: "LocalHost Staff, staff@localhost.com",
  to: user.email,
  subject: "LocalHost Account Activated",
  text: `Hello ${user.name}, Your account has been successfully activated!`,
  html: `Hello<strong> ${user.name}</strong>,<br><br>Your account has been successfully activated!`,
};

client.sendMail(emailActivate, function (err, info) {
  if (err) {
    console.log(err);
  } else {
    console.log("Activiation Message Confirmation -  : " + info.response);
  }
});
res.json({
  succeed: true,
  message: "User has been successfully activated",
});
