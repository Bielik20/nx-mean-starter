import { UserFromTokenProxy } from '@nx-mean-starter/models';
import { UserContext } from '@nx-mean-starter/schemas';
import { Express } from 'express';
import * as passport from 'passport';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { firebase } from '../core';

export function authenticate() {
  return passport.authenticate('bearer', { session: false });
}

export function initializeAuth(app: Express) {
  registerStrategies();
  app.use(passport.initialize());
}

function registerStrategies() {
  useBearer();
}

function useBearer() {
  passport.use(
    new BearerStrategy(async (token: string, done) => {
      try {
        const payload = await firebase.auth().verifyIdToken(token);
        const userFromJwt = UserFromTokenProxy.Create(payload);
        let user = await UserContext.findById(userFromJwt._id).lean();

        if (!user) {
          user = await new UserContext(userFromJwt).save();
        }

        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }),
  );
}
