const mongoose = require("mongoose");

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

const dbName = "lemonadeTycoon";
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/" + dbName;
//const dbUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/" + dbName;
//const dbUrl = global.__MONGO_URI__ || "mongodb://localhost:27017/" + dbName;
mongoose.connect(dbUrl, mongoOptions);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("connected to mongodb");
});
