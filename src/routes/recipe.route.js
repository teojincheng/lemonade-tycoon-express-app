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
    res.status(201).send(req.body);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
