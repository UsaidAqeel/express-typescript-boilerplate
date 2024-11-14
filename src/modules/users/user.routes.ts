import express from 'express';
const userRouter = express.Router();
import {
    registerUserController,
  } from './user.controller';
import {
    userValidator,
  } from './user.middleware';

userRouter.route('/register').post(userValidator, registerUserController);


export default userRouter;
