const express = require("express");
const router = express.Router();

const Customer = require("../models/customer.model");

const createCustomer = async customerData => {
  await Customer.init();
  const customer = new Customer();
  customer.customers = customerData;
  await customer.save();
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
