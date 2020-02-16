const express = require("express");
const router = express.Router();

const Supply = require("../models/supply.model");

const createSupplyItem = async supplyData => {
  await Supply.init();
  const doc = Supply(supplyData);
  await doc.save();
};

router.post("/", async (req, res, next) => {
  try {
    await createSupplyItem(req.body);
  } catch (err) {
    next(err);
  }
  const response = {};
  response.name = req.body.name;
  response.qty = req.body.qty;
  res.status(201).send(response);
});

module.exports = router;
