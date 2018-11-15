import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';

export type UserEntity = mongoose.Document & {
  email: string;
  password: string;

  comparePassword: comparePasswordFunction;
};

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
  const user = this;
  if (user.isModified('password') || user.isNew) {
    try {
      const salt = await genSalt();
      user.password = await genHash(salt, user.password);
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

// first generate a random salt
function genSalt() {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        reject(err);
      } else {
        resolve(salt);
      }
    });
  });
}

// hash the password with the salt
function genHash(salt, password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, salt, function(err, hash) {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
}

export const UserModel = mongoose.model('User', schema);
