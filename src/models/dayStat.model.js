const mongoose = require("mongoose");

const statsSchema = new mongoose.Schema({
  dayNumber: {
    type: Number,
    required: true,
    unique: true
  },
  costPerCup: {
    type: Number,
    required: true
  },
  sellingPricePerCup: {
    type: Number,
    required: true
  },
  cupsSold: {
    type: Number
  }
});
const DayStats = mongoose.model("DayStats", statsSchema);

module.exports = DayStats;
