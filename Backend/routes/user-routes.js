import express from 'express';
import { getAllusers, signup, login } from '../controllers/user-controller';

const userRouter = express.Router();

userRouter.get("/", getAllusers);
userRouter.post("/signup", signup);
userRouter.post("/login", login );

export default userRouter;