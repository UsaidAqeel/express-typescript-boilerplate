import { NextFunction, Request, Response } from 'express';
import {
    isEmailExistService,
    createUserService,
  } from './user.services';

export const registerUserController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try{
        const isUserExist = await isEmailExistService(req.body.email, next);

        if (!isUserExist) {
            const user = {
            ...req.body,
          };
          await createUserService(user, res);
        } else {
          const error = new Error('User Already Exist');
          error.statusCode = 403;
          return next(error);
        }

    }catch(error){
        // error.statusCode = 403;
        next(error);
    }
  }