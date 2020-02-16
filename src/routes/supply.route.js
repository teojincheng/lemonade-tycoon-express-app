const express = require("express");
const router = express.Router();

const Supply = require("../models/supply.model");

const createSupplyItem = async supplyData => {
  await Supply.init();
  const doc = Supply(supplyData);
  await doc.save();
};

const updateItem = async (name, itemData) => {
  const result = await Supply.findOneAndUpdate({ name }, itemData, {
    new: true
  });
  return result;
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

router.patch("/:name", async (req, res, next) => {
  const updatedItem = await updateItem(req.params.name, req.body);
  const response = {};
  response.name = updatedItem.name;
  response.qty = updatedItem.qty;
  res.status(200).send(response);
});

module.exports = router;
