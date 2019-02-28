const config = require('.');

module.exports = {
  ...config,
  logic: {
    ...config.logic,
    plugins: [
      ...(config.logic.plugins || []),
      'jest',
    ],
    env: {
      ...(config.logic.env || {}),
      'jest/globals': true,
    },
  },
};
