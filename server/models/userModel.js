const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10; // determines salt complexity for password hashing

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (email, password) {
  const emailExists = await this.findOne({ email });
  if (emailExists) {
    throw Error("Email already in use");
  }

  // Encrypt the password
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);

  // Store user credentials
  const user = await this.create({ email, password: hash });

  return user;
};

module.exports = mongoose.model("User", userSchema);
