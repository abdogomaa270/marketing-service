const express = require("express");

const router = express.Router();
const marketingController = require("../controllers/marketingController");
const { validateRequest } = require("../validations/marketingValidator");

router.route("/process-data").post(marketingController.sendEventToMeta);

module.exports = router;
