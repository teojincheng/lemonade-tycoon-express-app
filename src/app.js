const express = require("express");
const app = express();
app.use(express.json());

const supplyRouter = require("./routes/supply.route");

app.use("/supplies", supplyRouter);

module.exports = app;
