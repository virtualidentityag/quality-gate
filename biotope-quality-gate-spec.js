
module.exports = {
  // eslint-disable-next-line global-require
  ...require('.'),
  plugins: ['jest'],
  env: {
    'jest/globals': true,
  },
};
