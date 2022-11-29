const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  res.json({ message: "Login user" });
});

router.post("/signup", (req, res) => {
  res.json({ message: "Signup user" });
});

module.exports = router;
