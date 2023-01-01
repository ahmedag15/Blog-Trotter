const express = require("express");
const { getAllusers, signup, login } = require("../controllers/user-controller.js");


const userRouter = express.Router();

userRouter.get("/", getAllusers);
userRouter.post("/signup", signup);
userRouter.post("/login", login);

module.exports = userRouter;