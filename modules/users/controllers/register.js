const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtManager = require("../../../managers/jwtManager");
const emailManager = require("../../../managers/emailManager");

const register = async (req, res) => {
  const usersModel = mongoose.model("users");
  const { name, email, password, confirm_password, balance } = req.body;
  //validations
  if (!email) throw "Email must be provided";
  if (!password) throw "Password must be provided";
  if (password.length < 5) throw "Password must be atleast 5 characters long";
  if (password !== confirm_password)
    throw "Password and confirm password does not match";

  if (!name) throw "Name is required";
  if (balance <= 0) throw "Balance must be greater than 0";
  const getDuplicateEmail = await usersModel.findOne({ email: email });
  if (getDuplicateEmail) throw "This email already exists";
  const hashedPassword = await bcrypt.hash(password, 12);
  const createdUser = await usersModel.create({
    name: name,
    email: email,
    password: hashedPassword,
    balance: balance,
  });
  const accessToken = jwtManager(createdUser);

  await emailManager(
    createdUser.email,
    "Welcome to expense tracker pro. We hope you can manage your expenses easily from our platform!",
    "<h1>Welcome to expense tracker pro</h1> <br><br> We hope you can manage your expenses easily from our platform!",
    "Welcome to expense tracker PRO!"
  );
  res.status(201).json({
    status: "User registered successfully!",
    accessToken: accessToken,
  });
};
module.exports = register;
