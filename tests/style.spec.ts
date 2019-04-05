import { PROJECTS_PATH, testProject, mockConsole } from './helpers';

describe('style linting', (): void => {
  mockConsole();

  testProject(
    {
      sass: true,
      pattern: `${PROJECTS_PATH}/style-fail`,
    },
    [
      `./${PROJECTS_PATH}/style-fail/index.css [2, 11]: Expected single space after ":" with a single-line declaration (declaration-colon-space-after)`,
      `./${PROJECTS_PATH}/style-fail/index.css [2, 18]: Expected a trailing semicolon (declaration-block-trailing-semicolon)`,
      `./${PROJECTS_PATH}/style-fail/index.css [4, 2]: Unexpected whitespace at end of line (no-eol-whitespace)`,
      `./${PROJECTS_PATH}/style-fail/index.css [5, 1]: Unexpected empty line before closing brace (block-closing-brace-empty-line-before)`,
      `./${PROJECTS_PATH}/style-fail/index.css [7, 1]: Expected no more than 1 empty line (max-empty-lines)`,
      `./${PROJECTS_PATH}/style-fail/index.scss [2, 11]: Expected single space after ":" with a single-line declaration (declaration-colon-space-after)`,
      `./${PROJECTS_PATH}/style-fail/index.scss [2, 18]: Expected a trailing semicolon (declaration-block-trailing-semicolon)`,
      `./${PROJECTS_PATH}/style-fail/index.scss [4, 2]: Unexpected whitespace at end of line (no-eol-whitespace)`,
      `./${PROJECTS_PATH}/style-fail/index.scss [5, 1]: Unexpected empty line before closing brace (block-closing-brace-empty-line-before)`,
      `./${PROJECTS_PATH}/style-fail/index.scss [7, 1]: Expected no more than 1 empty line (max-empty-lines)`,
    ],
  );

  testProject({
    sass: true,
    pattern: `${PROJECTS_PATH}/style-pass`,
  });
});
