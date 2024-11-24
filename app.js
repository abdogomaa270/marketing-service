const { env } = require("./config/constants");
const { mountRoutes } = require("./routes");
const morgan = require("morgan");
const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan("dev"));

mountRoutes(app);
//---------------------------

app.listen(env.PORT || 3000, () => {
  console.log(`marketing service is running on port ${process.env.PORT}`);
});
