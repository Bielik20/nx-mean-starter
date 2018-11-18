import { User } from '@nx-mean-starter/models';
import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';

export interface UserEntity extends mongoose.Document, User {
  password: string;

  comparePassword(candidatePassword: string): Promise<boolean>;
}

const schema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: String,
  },
  { timestamps: true },
);

// ======================

schema.pre('save', async function(next) {
  const user = this as UserEntity;
  if (user.isModified('password') || user.isNew) {
    try {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(user.password, salt);
      return next();
    } catch (err) {
      return next(err);
    }
  } else {
    return next();
  }
});

// ======================

const comparePassword: UserEntity['comparePassword'] = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

schema.methods.comparePassword = comparePassword;

// ======================

export const UserContext = mongoose.model<UserEntity>('User', schema);
