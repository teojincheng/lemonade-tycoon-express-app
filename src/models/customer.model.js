const mongoose = require("mongoose");

const customer = new mongoose.Schema({
  imageSrc: {
    type: String,
    required: true
  }
});

const customerSchema = new mongoose.Schema({
  customers: [customer]
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
