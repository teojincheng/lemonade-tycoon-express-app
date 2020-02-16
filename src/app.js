const express = require("express");
const app = express();
app.use(express.json());

const supplyRouter = require("./routes/supply.route");
const recipeRouter = require("./routes/recipe.route");

app.use("/recipes", recipeRouter);
app.use("/supplies", supplyRouter);

module.exports = app;
