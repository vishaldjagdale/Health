import nodemailer from "nodemailer";
import ENV_VARS from "./ENV_Var.js";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ENV_VARS.NODEMAILER_EMAIL,
    pass: ENV_VARS.NODEMAILER_PW,
  },
});

const sendMail = async (email, subject, text) => {
  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: subject,
    text: text,
  };

  await transporter.sendMail(mailOptions);
};

export default sendMail;
