require("dotenv").config();
const API_PORT = process.env.API_PORT;

// Test Mongo connection
const { MONGO_HOST, MONGO_USER, MONGO_PASS, MONGO_DB_NAME, MONGO_PORT } =
  process.env;
const MONGO_URI = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}?authSource=admin`;
const mongoose = require("mongoose");
mongoose
  .connect(MONGO_URI)
  .then(console.log("connected to mongo"))
  .catch((err) => console.log(err));
// ---

const express = require("express");
const app = express();
const userRoutes = require("./routes/user");

app.use(express.json());
app.use((req, res, next) => {
  next();
});

app.use("/api/user", userRoutes);

app.listen(API_PORT, () => {
  console.log(`API is listening on port ${API_PORT}`);
});
