const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  imageSrc: {
    type: String,
    required: true
  }
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
