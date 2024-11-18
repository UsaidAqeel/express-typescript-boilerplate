import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IUsers extends Document {
  name: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true, unique: false },
  email: { type: String, required: false },
  password: { type: String, required: false, default: "" },
});

export const User = mongoose.model<IUsers>("User", UserSchema);
