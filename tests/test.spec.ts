import { defaultOptions } from '../src/api';
import { PROJECTS_PATH, testProject, mockConsole } from './helpers';

describe('style linting', (): void => {
  mockConsole();

  testProject(
    {
      ...defaultOptions,
      tests: true,
      pattern: `${PROJECTS_PATH}/test-fail`,
    },
    [
      `./${PROJECTS_PATH}/test-fail/index.spec.ts [2, 9]: There should be no spaces inside this paren. (space-in-parens)`,
      `./${PROJECTS_PATH}/test-fail/index.spec.ts [3, 1]: Expected indentation of 0 spaces but found 1. (@typescript-eslint/indent)`,
      `./${PROJECTS_PATH}/test-fail/index.spec.ts [3, 2]: Opening curly brace does not appear on the same line as controlling statement. (brace-style)`,
      `./${PROJECTS_PATH}/test-fail/index.spec.ts [4, 29]: Block must not be padded by blank lines. (padded-blocks)`,
      `./${PROJECTS_PATH}/test-fail/index.spec.ts [6, 5]: Unexpected whitespace before property toBe. (no-whitespace-before-property)`,
      `./${PROJECTS_PATH}/test-fail/index.spec.ts [6, 17]: Multiple spaces found before 'toBe'. (no-multi-spaces)`,
    ],
  );

  testProject({
    ...defaultOptions,
    tests: true,
    pattern: `${PROJECTS_PATH}/test-pass`,
  });
});
