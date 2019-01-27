import firebase from './firebase-adminsdk.json';

export const environment = {
  production: true,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost/nx-mean-starter',
  sessionSecret: 'sdfo38jds8n3vnsp02',
  port: process.env.PORT || 3333,
  firebase,
};
