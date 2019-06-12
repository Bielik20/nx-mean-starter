module.exports = {
  name: 'state-layout',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/state/layout',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
