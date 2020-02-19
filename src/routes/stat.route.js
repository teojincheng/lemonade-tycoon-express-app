const express = require("express");
const router = express.Router();

const DayStat = require("../models/dayStat.model");

router.post("/", async (req, res, next) => {
  res.status(201).send(req.body);
});

module.exports = router;
