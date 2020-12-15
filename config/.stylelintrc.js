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
    'shorthand-property-no-redundant-values': true,
    'declaration-no-important': true,
    'property-no-vendor-prefix': true,
    'selector-max-id': 0,
    'string-quotes': 'single',
    'scss/dollar-variable-colon-space-after': 'always',
    'scss/dollar-variable-colon-space-before': 'never',
    'plugin/no-unsupported-browser-features': [true, {
      severity: 'error',
      ignore: [
        'calc', // due to IE9+ bug being neglectable
      ],
    }],
    'selector-type-no-unknown': [true, {
      ignore: [
        'custom-elements'
      ]
    }]
  },
};
