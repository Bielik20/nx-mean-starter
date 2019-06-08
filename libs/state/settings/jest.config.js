module.exports = {
  name: 'state-settings',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/state/settings',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
