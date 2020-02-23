const express = require("express");
const router = express.Router();

const DayStat = require("../models/dayStat.model");

const createStatObj = async statsData => {
  await DayStat.init();
  const doc = DayStat(statsData);
  await doc.save();
};

const getStatistics = async () => {
  const statistics = await DayStat.aggregate([
    {
      $group: {
        _id: "$dayNumber",
        profitPerCup: {
          $sum: { $subtract: ["$sellingPricePerCup", "$costPerCup"] }
        }
      }
    }
  ]);
  return statistics;
};

router.post("/", async (req, res, next) => {
  try {
    await createStatObj(req.body);
    res.status(201).send(req.body);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res) => {
  const statistics = await getStatistics();
  res.status(200).send(statistics);
});

module.exports = router;
