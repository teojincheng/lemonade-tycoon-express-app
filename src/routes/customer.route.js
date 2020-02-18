const express = require("express");
const router = express.Router();

const Customer = require("../models/customer.model");

const createCustomers = async customerData => {
  await Customer.init();
  const customer = new Customer();
  customer.customers = customerData;
  await customer.save();
};

router.post("/", async (req, res, next) => {
  try {
    await createCustomers(req.body);
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

module.exports = router;
