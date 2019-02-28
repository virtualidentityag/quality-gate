
module.exports = {
  // eslint-disable-next-line global-require
  ...require('.').logic,
  plugins: ['jest'],
  env: {
    'jest/globals': true,
  },
};
