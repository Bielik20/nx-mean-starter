export const dev = {
  production: false,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost/nx-mean-starter',
  sessionSecret: 'ascva123fsadgt',
  port: 3333,
  firebase: JSON.parse(process.env.FIREBASE_ADMIN),
};
