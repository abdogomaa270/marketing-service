const { env } = require("./config/constants");
const { mountRoutes } = require("./routes");
const morgan = require("morgan");
const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan("dev"));

mountRoutes(app);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);

  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : "Internal Server Error";

  res.status(statusCode).json({ error: message });
});
// Catch Unhandled Rejections
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});
// Catch Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});
// Catch-all route for undefined endpoints
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});
//---------------------------

app.listen(env.PORT || 3000, () => {
  console.log(`marketing service is running on port ${process.env.PORT}`);
});
