module.exports = {
  extends: [
    'airbnb-base',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:compat/recommended',
    'plugin:react/recommended',
    "plugin:@stencil/recommended",
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
    'import/extensions': ['error', 'ignorePackages', { // add jsx and tsx extensions
      js: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
      mjs: 'never',
      // stencil specific rules
      "@stencil/async-methods": "error",
      "@stencil/ban-prefix": ["error", ["stencil", "stnl", "st"]],
      "@stencil/decorators-context": "error",
      "@stencil/decorators-style": [
        "error", {
          "prop": "inline",
          "state": "inline",
          "element": "inline",
          "event": "inline",
          "method": "multiline",
          "watch": "multiline",
          "listen": "multiline"
        }],
      "@stencil/element-type": "error",
      "@stencil/host-data-deprecated": "error",
      "@stencil/methods-must-be-public": "error",
      "@stencil/no-unused-watch": "error",
      "@stencil/own-methods-must-be-private": "error",
      "@stencil/own-props-must-be-private": "error",
      "@stencil/prefer-vdom-listener": "error",
      "@stencil/props-must-be-public": "error",
      "@stencil/props-must-be-readonly": "error",
      "@stencil/render-returns-host": "error",
      "@stencil/required-jsdoc": "error",
      "@stencil/reserved-member-names": "error",
      "@stencil/single-export": "error",
      "@stencil/strict-mutable": "error",
    }],

    // eslint-plugin-filenames - Force kebab-case or snake_case file naming
    'filenames/match-regex': ['error', '^[a-z-_.]+$', true],

    // Stencil rules
    'react/react-in-jsx-scope': 'off', // "React" is not mandatory to be imported when JSX is present
    'react/no-unknown-property': ['error', { ignore: ['class'] }], // allow "class" attribute on JSX
    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: 'h' }], // allow "h" unused variable (for Stencil)

    // This rule cannot yet be disabled ONLY for specific packages like "@stencil/core"
    // https://github.com/benmosher/eslint-plugin-import/issues/422
    // 'import/no-extraneous-dependencies': ['error', { /* add exceptions here */ }],
    'import/no-extraneous-dependencies': 'off',
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
