const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const SALT_ROUNDS = 10; // determines salt complexity for password hashing

const PASS_REQUIREMENTS = {
  minLength: 6,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 0,
};

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
  if (!email || !password) {
    throw Error("All fields are required");
  }
  if (!validator.isEmail(email)) {
    throw Error("Please use a valid email");
  }
  if (!validator.isStrongPassword(password, PASS_REQUIREMENTS)) {
    throw Error("Please use a strong password");
  }

  const emailExists = await this.findOne({ email });
  if (emailExists) {
    throw Error("Email already in use");
  }

  // Encrypt password and store credentials
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields are required");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("No user with such email found");
  }

  const passwordMatched = await bcrypt.compare(password, user.password);
  if (!passwordMatched) {
    throw Error("Password incorrect");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
