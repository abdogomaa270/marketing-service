const marketingRouter = require("./marketingRoute");

exports.mountRoutes = (app) => {
  app.use("/api", marketingRouter);
  //health endpoint
  app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
  });
};
