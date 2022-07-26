import mongoose from "mongoose"
require("dotenv").config();

const { uriDb = "http://localhost:3000" } = process.env;

const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  poolSize: 5,
});

mongoose.connection.on("error", (err) => {
  console.log(`Mongoose error: ${err}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

process.on("SIGINT", async () => {
  mongoose.connection.close(() => {
    console.log("Conection with DB is closed and App is terminated");
    process.exit(1);
  });
});

module.exports = db;
