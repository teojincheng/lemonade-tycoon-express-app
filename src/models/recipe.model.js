const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  qty: {
    type: Number,
    required: true
  }
});
const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
