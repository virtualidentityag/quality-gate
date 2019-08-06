
module.exports = {
  extends: [
    'airbnb-base',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:compat/recommended',
  ],
  plugins: [
    'filenames',
  ],
  rules: {
    // Project-specific Overrides
    'import/no-unresolved': 'off', // FIXME should be ignoring just '\\.(s?)css$', instead of being 'off'
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',

    // Modified Ts rules (to match AirBnB rules)
    '@typescript-eslint/indent': ['error', 2],

    // Disabled Ts rules (to let AirBnB rules deal with it)
    '@typescript-eslint/no-var-requires': 'off',

    // eslint-plugin-filenames - Force kebab-case or snake_case file naming
    'filenames/match-regex': ['error', '^[a-z-_.]+$', true],
  },
  env: {
    browser: true,
  },
};
