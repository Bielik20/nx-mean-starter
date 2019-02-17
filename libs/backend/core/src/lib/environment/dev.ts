import { firebase } from './firebase-adminsdk';

export const dev = {
  production: false,
  mongoUri: 'mongodb://localhost/nx-mean-starter',
  sessionSecret: 'ascva123fsadgt',
  port: 3333,
  firebase,
};
