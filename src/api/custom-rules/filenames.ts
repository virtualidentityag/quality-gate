import { resolve } from 'path';
import { CLIEngine as Eslint } from 'eslint';
import * as Stylelint from 'stylelint';

import { createLogicError, createStyleError } from './create-errors';

const rule = '@biotope-quality-gate/filenames';
const message = 'File path is error-prone. Use kebab-case for folder names and files.';

const regex = /^[a-z-./\\]+$/;

const checkFilename = (file: string): boolean => regex.test(resolve(file).replace(process.cwd(), ''));

export const filenames = {
  logic(files: string[], result: Eslint.LintReport): Eslint.LintReport {
    const additionalWarnings = files
      .filter((file): boolean => !checkFilename(file))
      .map((file): Eslint.LintResult => createLogicError({ file, rule, message }));

    // eslint-disable-next-line no-param-reassign
    result.results = [
      ...additionalWarnings,
      ...result.results.filter((res): boolean => !res.messages.filter(({ ruleId }): boolean => ruleId === 'filenames/match-regex').length),
    ];

    // eslint-disable-next-line no-param-reassign
    result.warningCount += additionalWarnings.length;

    return result;
  },

  style(files: string[], result: Stylelint.LinterResult): Stylelint.LinterResult {
    const additionalWarnings = files
      .filter((file): boolean => !checkFilename(file))
      .map((file): Stylelint.LintResult => createStyleError({ file, rule, message }));

    // eslint-disable-next-line no-param-reassign
    result.results = [
      ...additionalWarnings,
      ...result.results,
    ];

    // eslint-disable-next-line no-param-reassign
    result.output += JSON.stringify(result.results);

    return result;
  },
};
