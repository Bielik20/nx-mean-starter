export const environment = {
  production: true,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost/nx-mean-starter',
  sessionSecret: 'sdfo38jds8n3vnsp02',
  port: process.env.PORT || 3333,
  jwt: {
    secret: 'sadgf4gdfv',
    issuer: 'nx-mean-starter',
    audience: 'nx-mean-starter',
  },
};
