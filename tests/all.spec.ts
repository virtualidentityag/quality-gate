import { PROJECTS_PATH, testProject, mockConsole } from './helpers';

describe('all linting', () => {
  mockConsole();

  testProject(
    {
      javascript: true,
      typescript: true,
      sass: true,
      pattern: `${PROJECTS_PATH}/all-fail`,
    },
    [
      `./${PROJECTS_PATH}/all-fail/index.js [1, 1]: Too many blank lines at the beginning of file. Max of 2 allowed. (no-multiple-empty-lines)`,
      `./${PROJECTS_PATH}/all-fail/index.js [4, 1]: Unexpected console statement. (no-console)`,
      `./${PROJECTS_PATH}/all-fail/index.js [4, 32]: Missing semicolon. (semi)`,
      `./${PROJECTS_PATH}/all-fail/index.ts [1, 1]: Too many blank lines at the beginning of file. Max of 2 allowed. (no-multiple-empty-lines)`,
      `./${PROJECTS_PATH}/all-fail/index.ts [4, 1]: Unexpected console statement. (no-console)`,
      `./${PROJECTS_PATH}/all-fail/index.ts [4, 36]: Missing semicolon. (semi)`,
      `./${PROJECTS_PATH}/all-fail/index.scss [5, 1]: Unexpected empty line before closing brace (block-closing-brace-empty-line-before)`,
      `./${PROJECTS_PATH}/all-fail/index.scss [2, 16]: Expected a trailing semicolon (declaration-block-trailing-semicolon)`,
      `./${PROJECTS_PATH}/all-fail/index.scss [7, 1]: Expected no more than 1 empty line (max-empty-lines)`,
      `./${PROJECTS_PATH}/all-fail/index.scss [4, 2]: Unexpected whitespace at end of line (no-eol-whitespace)`,
    ],
  );

  testProject({
    javascript: true,
    typescript: true,
    sass: true,
    pattern: `${PROJECTS_PATH}/all-pass`,
  });
});
