const express = require("express");
const router = express.Router();

const DayStat = require("../models/dayStat.model");

router.post("/", async (req, res, next) => {
  res.send("hi");
});

module.exports = router;
