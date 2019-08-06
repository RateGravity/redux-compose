const { join } = require('path');

module.exports = {
  verbose: true,
  rootDir: join(__dirname, './src'),
  moduleFileExtensions: ['json', 'ts', 'js'],
  testMatch: ['**/__tests__/**/*.ts'],
  transform: {
    '.\\.ts$': 'babel-jest'
  }
};
