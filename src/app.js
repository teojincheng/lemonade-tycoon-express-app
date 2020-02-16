const express = require("express");
const app = express();
app.use(express.json());

const supplyRouter = require("./routes/supply.route");
const recipeRouter = require("./routes/recipe.route");

app.use("/supplies", supplyRouter);
app.use("/recipes", recipeRouter);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode);
  if (err.statusCode) {
    res.send({ error: err.message });
  } else {
    res.send({ error: "internal server error" });
  }
});

module.exports = app;
