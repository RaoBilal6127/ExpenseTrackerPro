require("express-async-errors");
const express = require("express");
const cors = require("cors");
const errorHandler = require("./handlers/errorHandler");
const mongoose = require("mongoose");
const userRoutes = require("./modules/users/users.routes");
const transactionRoutes = require("./modules/transactions/transactions.routes");
require("dotenv").config();

const app = express();
app.use(cors());
require("./models/users.model");
require("./models/transactions.model");
app.use(express.json());
mongoose
  .connect(process.env.CONNECTION_STRING, {})
  .then(() => console.log("Database connection successful"))
  .catch(() => console.log("Database connection failed"));
//Routes
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);
//End of all routes
app.all("*", (req, res, next) => {
  res.status(404).json({ status: "failed", message: "Not found" });
});
app.use(errorHandler);
app.listen(8000, () => {
  console.log("Server started successfully");
});
