import { UserModel } from '@nx-mean-starter/schemas';
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
    new JwtStrategy(opts, function(jwt_payload, done) {
      console.log(jwt_payload);
      UserModel.findOne({ _id: jwt_payload.sub }, function(err, user) {
        console.log(err, user);
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      });
    }),
  );
}
