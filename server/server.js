const express = require("express");

require("dotenv").config();
const PORT = process.env.PORT;

const app = express();

// Set up middleware
app.use((req, res, next) => {
  // test requests
  console.log(`Requested ${req.path} with ${req.method} method`);
  next();
});

// Set up route
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

// Listen for client requests
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
