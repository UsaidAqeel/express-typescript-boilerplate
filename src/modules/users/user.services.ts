import { NextFunction, Response } from 'express';
import { User, IUsers } from './user.modal';
import bcrypt from 'bcrypt';
import { BCRYPT_SALT } from '../../constant';
import { ResponsePacket } from '../../utils';

export const isEmailExistService = async (
    email: any,
    next: NextFunction,
  ): Promise<boolean | undefined | void> => {
    try {
      const isUser = await User.findOne({ "email": email, isDeleted: false, status: 'ACTIVE' });
      if (isUser) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      (error as any).statusCode = 400;
      return next(error);
    }
  };

  export const createUserService = async (
    data: IUsers,
    res: Response,
  ): Promise<void> => {
    const salt = await bcrypt.genSalt(parseInt(BCRYPT_SALT as string));
    data.password = await bcrypt.hash(data.password as string, salt);
    const newUser = new User(data);
    const result = await newUser.save();
    if ((result as any)._doc) delete (result as any)._doc.password;
    const resPacket = new ResponsePacket(
      201,
      true,
      'User Created Successfully!',
      result,
    );
    res.status(200).json(resPacket);
  };