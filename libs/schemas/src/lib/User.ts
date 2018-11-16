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
      user.password = await hash(user.password, salt);
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
function hash(password, salt) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, salt, function(err, _hash) {
      if (err) {
        reject(err);
      } else {
        resolve(_hash);
      }
    });
  });
}

export const UserContext = mongoose.model('User', schema);
