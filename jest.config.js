const config = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/client/**',
    '**/server/**',
    // Ignore the below files
    '!**/supertest.test.js',
  ],
  testEnvironment: 'jsdom',
  testMatch:['**.test.js'],
  testPathIgnorePatterns: [
    './__tests__/',
    './config/',
    './node_modules/'
  ],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  }
};

module.exports = config;