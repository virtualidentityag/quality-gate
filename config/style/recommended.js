
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-scss',
  ],
  plugins: [
    'stylelint-scss',
    'stylelint-no-unsupported-browser-features',
  ],
  rules: {
    'number-leading-zero': 'never',
    'plugin/no-unsupported-browser-features': true,
  },
};
