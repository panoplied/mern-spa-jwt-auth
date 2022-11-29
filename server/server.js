require("dotenv").config();
const PORT = process.env.PORT;

const express = require("express");
const app = express();
const userRoutes = require("./routes/user");

app.use(express.json());
app.use((req, res, next) => {
  next();
});

app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
