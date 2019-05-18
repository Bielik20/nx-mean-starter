module.exports = {
  name: 'ionic-app',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/ionic-app/',
  transformIgnorePatterns: [
    "node_modules/(?!@ionic-native|@ionic)"
  ],
};
