import { User } from '@nx-mean-starter/models';
import * as mongoose from 'mongoose';

export interface UserEntity extends mongoose.Document, User {
  _id: string;
}

const schema = new mongoose.Schema(
  {
    _id: String,
    email: { type: String, unique: true, required: true, index: true },
    emailVerified: Boolean,
    name: String,
    pictureUrl: String,
    phoneNumber: String,
  },
  {
    timestamps: true,
  },
);

export const UserContext = mongoose.model<UserEntity>('User', schema);
