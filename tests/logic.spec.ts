import { defaultOptions } from '../src/api';
import { PROJECTS_PATH, testProject, mockConsole } from './helpers';

describe('logic linting', (): void => {
  mockConsole();

  testProject(
    {
      ...defaultOptions,
      pattern: `${PROJECTS_PATH}/logic-fail`,
    },
    [
      `./${PROJECTS_PATH}/logic-fail/wrongName.js: File path is error-prone. Use kebab-case or snake_case for folder names and files. (biotope-quality-gate/filenames)`,
      `./${PROJECTS_PATH}/logic-fail/wrongName.ts: File path is error-prone. Use kebab-case or snake_case for folder names and files. (biotope-quality-gate/filenames)`,
      `./${PROJECTS_PATH}/logic-fail/index.js [1, 1]: Too many blank lines at the beginning of file. Max of 1 allowed. (no-multiple-empty-lines)`,
      `./${PROJECTS_PATH}/logic-fail/index.js [4, 1]: Unexpected console statement. (no-console)`,
      `./${PROJECTS_PATH}/logic-fail/index.js [4, 32]: Missing semicolon. (semi)`,
      `./${PROJECTS_PATH}/logic-fail/index.ts [1, 1]: Too many blank lines at the beginning of file. Max of 1 allowed. (no-multiple-empty-lines)`,
      `./${PROJECTS_PATH}/logic-fail/index.ts [4, 1]: Unexpected console statement. (no-console)`,
      `./${PROJECTS_PATH}/logic-fail/index.ts [4, 36]: Missing semicolon. (semi)`,
    ],
  );

  testProject({
    ...defaultOptions,
    skipStyle: true,
    pattern: `${PROJECTS_PATH}/logic-pass`,
  });
});
