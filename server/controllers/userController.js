const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

const jwt = require("jsonwebtoken");
const createAuthToken = (id) => {
  const token = jwt.sign({ id }, JWT_PRIVATE_KEY, { expiresIn: "30d" });
  return token;
};

const User = require("../models/userModel");
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createAuthToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    const token = createAuthToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  login,
  signup,
};
