const eslintrc = require('./.eslintrc');

module.exports = {
  ...eslintrc,
  plugins: [
    ...eslintrc.plugins,
    'jest',
  ],
  env: {
    ...eslintrc.env,
    'jest/globals': true,
  },
};
