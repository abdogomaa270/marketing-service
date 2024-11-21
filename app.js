require("dotenv").config({ path: ".env" });
const { mountRoutes } = require("./routes");
const morgan = require("morgan");
const express = require("express");

//1- initialize express instance
const app = express();
//2- applying Middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//3- logging
app.use(morgan("dev"));

//4- mount routes
mountRoutes(app);
//---------------------------
//5- running server
app.listen(process.env.PORT || 3000, () => {
  console.log(`marketing service is running on port ${process.env.PORT}`);
});
