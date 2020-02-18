const express = require("express");
const router = express.Router();

const Customer = require("../models/customer.model");

const createCustomer = async customerData => {
  await Customer.init();
  const customer = new Customer();
  customer.customers = customerData;
  await customer.save();
};
