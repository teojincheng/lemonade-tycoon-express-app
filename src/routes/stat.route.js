const express = require("express");
const router = express.Router();

const DayStat = require("../models/dayStat.model");

const createStatObj = async statsData => {
  await DayStat.init();
  const doc = DayStat(statsData);
  await doc.save();
};

router.post("/", async (req, res, next) => {
  try {
    await createStatObj(req.body);
    res.status(201).send(req.body);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
