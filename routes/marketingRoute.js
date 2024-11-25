const express = require("express");

const router = express.Router();
const marketingController = require("../controllers/marketingController");
const { processDataValidator } = require("../validations/marketingValidator");

router
  .route("/process-data")
  .post(processDataValidator, marketingController.sendEventToMeta);

module.exports = router;
