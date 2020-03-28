const express = require("express");
const router = express.Router();
const axios = require("axios");
const Customer = require("../Customer");
const NUM_CUSTOMERS = 2;
const ARR_OF_IMAGES = require("../ARR_OF_IMAGES");

const createCustomersWithImage = apiImages => {
  const customers = [];

  for (let i = 0; i < NUM_CUSTOMERS; i++) {
    const newCustomer = new Customer(apiImages.data.results[i].picture.medium);
    customers.push(newCustomer);
  }

  return customers;
};

router.get("/", async (req, res) => {
  let customers = [];
  try {
    const images = await axios(
      `https://randomuser.me/api/?results=${NUM_CUSTOMERS}`
    );
    customers = createCustomersWithImage(images);
  } catch (err) {
    for (let i = 0; i < NUM_CUSTOMERS; i++) {
      const newCustomer = new Customer(
        ARR_OF_IMAGES[Math.floor(Math.random() * ARR_OF_IMAGES.length)]
      );
      customers.push(newCustomer);
    }
  }
  res.status(200).send(customers);
});

module.exports = router;
