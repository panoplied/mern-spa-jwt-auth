const login = async (req, res) => {
  res.json({ message: "Login User" });
};

const signup = async (req, res) => {
  res.json({ message: "Signup User" });
};

module.exports = {
  login,
  signup,
};
