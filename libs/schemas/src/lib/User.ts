import { User } from '@nx-mean-starter/models';
import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';

export interface UserEntity extends mongoose.Document, User {
  password: string;

  comparePassword: comparePasswordFunction;
}

type comparePasswordFunction = (candidatePassword: string) => Promise<boolean>;

const schema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
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

schema.methods.comparePassword = function(candidatePassword): Promise<boolean> {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) {
        reject(err);
      } else if (isMatch) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

export const UserContext = mongoose.model<UserEntity>('User', schema);
