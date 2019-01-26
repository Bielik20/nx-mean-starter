// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import firebase from './firebase-adminsdk.json';

export const environment = {
  production: false,
  mongoUri: 'mongodb://localhost/nx-mean-starter',
  sessionSecret: 'ascva123fsadgt',
  port: 3333,
  jwt: {
    secret: 'smfd32fsd',
    issuer: 'nx-mean-starter',
    audience: 'nx-mean-starter',
  },
  firebase,
};
