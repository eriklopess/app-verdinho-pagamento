module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './test',
  testSequencer: './config/sequencer.js',
  // setupFilesAfterEnv: ['./config/setup.js'],
  testTimeout: 10000,
};
