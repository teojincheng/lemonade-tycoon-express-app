const express = require("express");
const router = express.Router();

const Recipe = require("../models/recipe.model");

const createRecipeItem = async recipeData => {
  await Recipe.init();
  const doc = Recipe(recipeData);
  await doc.save();
};

router.post("/", async (req, res, next) => {
  try {
    await createRecipeItem(req.body);
  } catch (err) {
    next(err);
  }
  res.status(201).send(req.body);
});

module.exports = router;
