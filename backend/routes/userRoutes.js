const express = require("express");
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const userRouter = express.Router();

// Fethcing all users Records
userRouter.get("/", getAllUsers);

// Creating a new User
userRouter.post("/create", createUser);

// For updating users
userRouter.put("/update/:id", updateUser);

// For deleting users
userRouter.delete("/delete/:id", deleteUser);

module.exports = userRouter;
