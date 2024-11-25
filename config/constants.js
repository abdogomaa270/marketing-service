require("dotenv").config("./.env");

module.exports.env = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  PIXEL_ID: process.env.PIXEL_ID,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
};

