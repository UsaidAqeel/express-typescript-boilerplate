import mongoose, { Document, ObjectId, Schema } from 'mongoose';
import uniqueValidators from 'mongoose-unique-validator';
import { SoftDeleteModel, softDeletePlugin } from 'soft-delete-plugin-mongoose';

export interface IUsers extends Document {
    _id?: ObjectId;
    email: string;
    password?: string;
  }

  const UserSchema: Schema = new Schema({
    name: { type: String, required: true, unique: false },
    email: { type: String, required: false },
    password: { type: String, required: false, default: '' },
  })

    UserSchema.plugin(uniqueValidators);
    UserSchema.plugin(softDeletePlugin);
    export const User = mongoose.model<IUsers, SoftDeleteModel<IUsers>>(
      'User',
      UserSchema,
    );