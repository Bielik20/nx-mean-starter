export const environment = {
  production: true,
  mongoUrl: 'mongodb://<mlab_user>:<mlab_password>@<mlab_connection_url>',
  sessionSecret: 'sdfo38jds8n3vnsp02',
  port: process.env.PORT || 3333,
  jwt: {
    secret: 'sadgf4gdfv',
    issuer: 'nx-mean-starter',
    audience: 'nx-mean-starter',
  },
};
