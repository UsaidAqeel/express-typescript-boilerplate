import express from "express";
import { registerUserController } from "./user.controller";
import { userValidator } from "./user.middleware";

const userRouter = express.Router();

userRouter.route("/register").post(userValidator, registerUserController);

export default userRouter;
