const express = require("express");
const router = express.Router();

const Recipe = require("../models/recipe.model");

const createRecipeItem = async recipeData => {
  await Recipe.init();
  const doc = Recipe(recipeData);
  await doc.save();
};

const updateRecipeItem = async (itemName, recipeData) => {
  const result = await Recipe.findOneAndUpdate({ name: itemName }, recipeData, {
    new: true
  });
  return result;
};

const getAllRecipeData = async () => {
  const recipesData = await Recipe.find({}, "name qty -_id");
  return recipesData;
};

const deleteRecipes = async () => {
  const result = await Recipe.deleteMany({});
  return result;
};

router.post("/", async (req, res, next) => {
  try {
    await createRecipeItem(req.body);
    res.status(201).send(req.body);
  } catch (err) {
    next(err);
  }
});

router.patch("/:name", async (req, res, next) => {
  const updatedRecipeItem = await updateRecipeItem(req.params.name, req.body);
  const updatedItemResult = {};
  updatedItemResult.name = updatedRecipeItem.name;
  updatedItemResult.qty = updatedRecipeItem.qty;
  res.status(200).send(updatedItemResult);
});

router.delete("/", async (req, res, next) => {
  const recipesData = await getAllRecipeData();
  const deleteResult = await deleteRecipes();
  res.status(200).send(recipesData);
});

module.exports = router;
