const express = require("express");
const router = express.Router();

const Supply = require("../models/supply.model");

const createSupplyItem = async supplyData => {
  await Supply.init();
  const supply = new Supply();
  supply.items = supplyData;
  await supply.save();
  //const doc = Supply(supplyData);
  //await doc.save();
};

const updateItem = async (itemName, itemData) => {
  const updatedItem = await Supply.findOneAndUpdate(
    { "items.name": itemName },
    { $set: { "items.$.qty": itemData.qty } },
    { new: true }
  );

  //const item = supply.findOne({ "items.name": itemName });

  /*
  const result = await Supply.findOneAndUpdate({ name }, itemData, {
    new: true
  });
  return result;
  */
  return updatedItem.items[0];
};

router.post("/", async (req, res, next) => {
  try {
    suppliesObj = { items: req.body };
    await createSupplyItem(req.body);
    res.status(201).send(suppliesObj);
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
  console.log("checking for updated item");
  console.log(updatedItem);
  const updatedResponse = {};
  updatedResponse.name = updatedItem.name;
  updatedResponse.qty = updatedItem.qty;
  res.status(200).send(updatedResponse);
});

module.exports = router;
