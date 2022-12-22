import express from 'express';
import { getAlluser, signup, login } from '../controllers/user-controller';

const userRouter = express.Router();

userRouter.get("/", getAlluser);
userRouter.post("/signup", signup);
userRouter.post("/login", login );

export default userRouter;