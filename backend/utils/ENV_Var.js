import dotenv from "dotenv";
dotenv.config();

const ENV_VARS = {
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  CLIENT_URL: process.env.CLIENT_URL,
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT,
  NODEMAILER_EMAIL: process.env.NODEMAILER_EMAIL,
  NODEMAILER_PW: process.env.NODEMAILER_PW,
};

export default ENV_VARS;
