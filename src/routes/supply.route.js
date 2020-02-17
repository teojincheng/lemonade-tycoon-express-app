const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
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
    const respObj = {};
    respObj.name = req.body.name;
    respObj.qty = req.body.qty;
    res.status(201).send(respObj);
  } catch (err) {
    if (err.name === "ValidationError") {
      err.statusCode = 400;
    } else if (err.name === "MongoError") {
      err.statusCode = 400;
    }
    next(err);
  }
});

router.patch("/:name", async (req, res) => {
  const updatedItem = await updateItem(req.params.name, req.body);
  const response = {};
  response.name = updatedItem.name;
  response.qty = updatedItem.qty;
  res.status(200).send(response);
});

module.exports = router;
