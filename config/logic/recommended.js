module.exports = {
  extends: [
    'airbnb-base',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:compat/recommended',
    'plugin:react/recommended',
  ],
  // Needed because @typescript-eslint >= 2.0 does not check if file is typescript
  overrides: [
    {
      // Regex for @typescript-eslint < 2.0 was /\.tsx?$/
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
      ],
      rules: {
        // Modified recommended rules (to match AirBnB rules)
        '@typescript-eslint/indent': ['error', 2],
        indent: 'off',
      },
    },
  ],
  plugins: [
    'filenames',
  ],
  rules: {
    // Project-specific Overrides
    'import/no-unresolved': 'off', // FIXME should be ignoring just '\\.(s?)css$', instead of being 'off'
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',

    // eslint-plugin-filenames - Force kebab-case or snake_case file naming
    'filenames/match-regex': ['error', '^[a-z-_.]+$', true],

    // JSX for Stencil
    'react/react-in-jsx-scope': 'off', // "React" is not mandatory to be imported when JSX is present
    'react/no-unknown-property': ['error', { ignore: ['class'] }], // allow "class" attribute on JSX
    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: 'h' }], // allow "h" unused variable (for Stencil)
  },
  env: {
    browser: true,
  },
  settings: {
    react: {
      // Hack to disable warning for "eslint-plugin-react"
      version: '16.0',
    },
  },
};
