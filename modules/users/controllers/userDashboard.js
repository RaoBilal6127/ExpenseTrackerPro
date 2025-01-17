const mongoose = require("mongoose");
const userDashboard = async (req, res) => {
  const usersModel = mongoose.model("users");
  const transactionModel = mongoose.model("transactions");
  const getUser = await usersModel.findById(req.user._id).select("-password");
  const transactions = await transactionModel
    .find({ user_id: req.user._id })
    .sort("-createdAt")
    .limit(5);
  res.status(200).json({
    status: "Hello from user dashboard",
    data: getUser,
    transactions,
  });
};
module.exports = userDashboard;
