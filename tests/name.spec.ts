import { defaultOptions } from '../src/api';
import { PROJECTS_PATH, testProject, mockConsole } from './helpers';

describe('name linting', (): void => {
  mockConsole();

  testProject(
    {
      ...defaultOptions,
      pattern: `${PROJECTS_PATH}/nameFail`,
    },
    [
      `./${PROJECTS_PATH}/nameFail/index.js: File path is error-prone. Use kebab-case or snake_case for folder names and files. (biotope-quality-gate/filenames)`,
      `./${PROJECTS_PATH}/nameFail/index.ts: File path is error-prone. Use kebab-case or snake_case for folder names and files. (biotope-quality-gate/filenames)`,
      `./${PROJECTS_PATH}/nameFail/index.css: File path is error-prone. Use kebab-case or snake_case for folder names and files. (biotope-quality-gate/filenames)`,
      `./${PROJECTS_PATH}/nameFail/index.scss: File path is error-prone. Use kebab-case or snake_case for folder names and files. (biotope-quality-gate/filenames)`,
    ],
  );

  testProject({
    ...defaultOptions,
    pattern: `${PROJECTS_PATH}/name-pass`,
  });
});
