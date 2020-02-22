const express = require("express");
const router = express.Router();

const Supply = require("../models/supply.model");

const createSupplyItems = async supplyData => {
  await Supply.init();
  const supply = new Supply();
  supply.items = supplyData;
  await supply.save();
  //const doc = Supply(supplyData);
  //await doc.save();
};

const getArrayOfSupplyItems = async () => {
  const SuppliesDocument = await Supply.findOne().select("-_id -__v");
  return SuppliesDocument.items;
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

const updateSupplies = async suppliesData => {
  let arrOfPromises = [];
  for (let i = 0; i < suppliesData.length; i++) {
    arrOfPromises.push(
      await Supply.updateOne(
        { "items.name": suppliesData[i].name },
        { $set: { "items.$.qty": suppliesData[i].qty } }
      )
    );
  }
  return arrOfPromises;
};

const deleteSupplies = async () => {
  const result = await Supply.deleteMany({});
  return result;
};

router.post("/", async (req, res, next) => {
  try {
    await createSupplyItems(req.body);
    res.status(201).send(req.body);
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
  const updatedResponse = {};
  updatedResponse.name = updatedItem.name;
  updatedResponse.qty = updatedItem.qty;
  res.status(200).send(updatedResponse);
});

router.patch("/", async (req, res) => {
  let arrOfPromises = await updateSupplies(req.body);

  Promise.all(arrOfPromises).then(res.status(200).send(req.body));
});

router.get("/", async (req, res) => {
  const arrOfSupplies = await getArrayOfSupplyItems();
  res.status(200).send(arrOfSupplies);
});

router.delete("/", async (req, res) => {
  const arrOfSupplies = await getArrayOfSupplyItems();
  const deleteResult = await deleteSupplies();
  res.status(200).send(arrOfSupplies);
});

module.exports = router;
