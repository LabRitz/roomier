const config = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/client/**',
    '**/server/**',
    // Ignore the below files
    '!**/index.js',
    '!**/passport.js'
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(scss|css|less)$': 'identity-obj-proxy',
  },
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