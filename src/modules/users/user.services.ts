import { NextFunction, Response } from "express";
import { User, IUsers } from "./user.model";
import bcrypt from "bcrypt";
import { BCRYPT_SALT } from "../../constant";
import { httpStatusCodes, ResponsePacket } from "../../utils";

export const isEmailExistService = async (
  email: any,
  next: NextFunction
): Promise<boolean | undefined | void> => {
  try {
    const isUser = await User.findOne({
      email: email,
      isDeleted: false,
      status: "ACTIVE",
    });

    return !!isUser;
  } catch (error) {
    (error as any).statusCode = 400;
    return next(error);
  }
};

export const createUserService = async (
  data: IUsers
): Promise<Record<string, any>> => {
  try {
    const salt = await bcrypt.genSalt(parseInt(BCRYPT_SALT as string));
    data.password = await bcrypt.hash(data.password as string, salt);

    const newUser = new User(data);
    const result = await newUser.save();

    const user = result.toJSON();
    delete user.password;

    return ResponsePacket.success(
      httpStatusCodes.CREATED,
      "User Created SuccesFully",
      user
    );
  } catch (error) {
    console.error("Error: Creating user service", error);

    return ResponsePacket.failure(
      httpStatusCodes.NOT_ACCEPTABLE,
      "Failed to create user. Please try again.",
      null
    );
  }
};
