const mongoose = require("mongoose");

const supplySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  qty: {
    type: Number,
    required: true
  },
  costPrice: Number
});
const Supply = mongoose.model("Supply", supplySchema);

module.exports = Supply;
