import { resolve } from 'path';
import { CLIEngine as Eslint } from 'eslint';
import * as Stylelint from 'stylelint';

import { updateLogicResults, updateStyleResults, CustomError } from './update-results';

const rule = 'biotope-quality-gate/filenames';
const message = 'File path is error-prone. Use kebab-case or snake_case for folder names and files.';

const regex = /^[a-z-_./\\]+$/;

const checkFilename = (file: string): boolean => regex.test(resolve(file).replace(process.cwd(), ''));

export const filenames = {
  logic(files: string[], result: Eslint.LintReport): Eslint.LintReport {
    const newErrors = files
      .filter((file) => !checkFilename(file))
      .map((file): CustomError => ({ file, rule, message }));

    return updateLogicResults(newErrors, result);
  },

  style(files: string[], result: Stylelint.LinterResult): Stylelint.LinterResult {
    const newErrors = files
      .filter((file) => !checkFilename(file))
      .map((file): CustomError => ({ file, rule, message }));

    return updateStyleResults(newErrors, result);
  },
};
