import { UserContext } from '@nx-mean-starter/schemas';
import { Express } from 'express';
import * as passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

import { environment } from '../../environments/environment';

export function authenticate() {
  return passport.authenticate('jwt', { session: false });
}

export function initializeAuth(app: Express) {
  registerStrategies();
  app.use(passport.initialize());
}

function registerStrategies() {
  useJwt();
}

function useJwt() {
  const opts = {
    secretOrKey: environment.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  passport.use(
    new JwtStrategy(opts, async (jwtPayload, done) => {
      try {
        const user = await UserContext.findOne({ _id: jwtPayload.sub });
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      } catch (err) {
        return done(err, false);
      }
    }),
  );
}
