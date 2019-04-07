import { Config } from '../../src/api/config';
import * as logic from '../../config/logic/recommended';
import * as style from '../../config/style/recommended';

export const noConfig: Config = {};

export const emptyConfig: Config = {
  logic: {},
  style: {},
};

export const partialConfig: Config = {
  logic: {
    extends: [
      'airbnb-base',
      'plugin:@typescript-eslint/recommended',
    ],
  },
  style: {
    extends: [
      'stylelint-config-standard',
      'stylelint-config-recommended-scss',
    ],
  },
};

export const fullConfig: Config = {
  logic: {
    extends: [
      'airbnb-base',
      'plugin:@typescript-eslint/recommended',
    ],
    rules: {
      // Project-specific Overrides
      'import/no-unresolved': 'off',
      'import/prefer-default-export': 'off',
      'import/no-default-export': 'error',

      // Modified Ts rules (to match AirBnB rules)
      '@typescript-eslint/indent': ['error', 2],

      // Disabled Ts rules (to let AirBnB rules deal with it)
      '@typescript-eslint/no-var-requires': 'off',
    },
    env: {
      browser: true,
    },
  },
  style: {
    extends: [
      'stylelint-config-standard',
      'stylelint-config-recommended-scss',
    ],
    plugins: [
      'stylelint-scss',
    ],
    rules: {
      'number-leading-zero': 'never',
    },
  },
};

export const importedConfig: Config = {
  logic,
  style,
};
