module.exports = {
  name: 'feature-layout',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/feature/layout',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
