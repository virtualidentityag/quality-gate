import { PROJECTS_PATH, testProject, mockConsole } from './helpers';

describe('logic linting', () => {
  mockConsole();

  testProject(
    {
      pattern: `${PROJECTS_PATH}/logic-fail`,
    },
    [
      `./${PROJECTS_PATH}/logic-fail/index.js [1, 1]: Too many blank lines at the beginning of file. Max of 2 allowed. (no-multiple-empty-lines)`,
      `./${PROJECTS_PATH}/logic-fail/index.js [4, 1]: Unexpected console statement. (no-console)`,
      `./${PROJECTS_PATH}/logic-fail/index.js [4, 32]: Missing semicolon. (semi)`,
      `./${PROJECTS_PATH}/logic-fail/index.ts [1, 1]: Too many blank lines at the beginning of file. Max of 2 allowed. (no-multiple-empty-lines)`,
      `./${PROJECTS_PATH}/logic-fail/index.ts [4, 1]: Unexpected console statement. (no-console)`,
      `./${PROJECTS_PATH}/logic-fail/index.ts [4, 36]: Missing semicolon. (semi)`,
    ],
  );

  testProject({
    pattern: `${PROJECTS_PATH}/logic-pass`,
  });
});
