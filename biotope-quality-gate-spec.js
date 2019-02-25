const recommended = require('./config/recommended');

module.exports = {
  ...recommended,
  plugins: ['jest'],
  env: {
    'jest/globals': true,
  },
};
