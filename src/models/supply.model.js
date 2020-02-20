const mongoose = require("mongoose");

const item = new mongoose.Schema(
  {
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
  },
  { _id: false }
);

const supplySchema = new mongoose.Schema({
  items: [item]
});

const Supply = mongoose.model("Supply", supplySchema);

module.exports = Supply;
