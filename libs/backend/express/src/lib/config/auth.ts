import { firebase } from '@nx-mean-starter/backend/core';
import { UserFromToken, UserFromTokenProxy } from '@nx-mean-starter/models';
import { Express } from 'express';
import * as passport from 'passport';
import { Strategy as BearerStrategy } from 'passport-http-bearer';

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
        const user: UserFromToken = UserFromTokenProxy.Create(payload);

        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }),
  );
}
