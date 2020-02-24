const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");

const corsOptions = {
  origin: [process.env.FRONTEND_URL, "http://localhost:3001"],
  credentials: true
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.status(200).send("hello this is lemonade tycoon backend wow");
});

const supplyRouter = require("./routes/supply.route");
const recipeRouter = require("./routes/recipe.route");
const customerRouter = require("./routes/customer.route");
const statRouter = require("./routes/stat.route");

app.use("/recipes", recipeRouter);
app.use("/supplies", supplyRouter);
app.use("/customers", customerRouter);
app.use("/statistics", statRouter);

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
