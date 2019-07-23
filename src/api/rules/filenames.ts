import { resolve } from 'path';
import { CLIEngine as Eslint } from 'eslint';
import * as Stylelint from 'stylelint';

import { unfixStylelintTyping } from '../fix-stylelint-warning';

const rule = '@biotope-quality-gate/filenames';
const message = 'File path is error-prone. Use kebab-case for folder names and files.';

const regex = /^[a-z-./\\]+$/;

const checkFilename = (file: string): boolean => regex.test(resolve(file).replace(process.cwd(), ''));

const createLogicWarning = (file: string): Eslint.LintResult => ({
  filePath: resolve(file),
  messages: [{
    ruleId: rule,
    severity: 1,
    message,
    nodeType: 'Program',
    line: 0,
    column: 0,
    source: '',
  }],
  errorCount: 0,
  warningCount: 1,
  fixableErrorCount: 0,
  fixableWarningCount: 0,
});

const createStyleWarning = (file: string): Stylelint.LintResult => ({
  source: resolve(file),
  errored: false,
  ignored: false,
  warnings: unfixStylelintTyping([{
    line: 0,
    column: 0,
    rule,
    severity: 'warning',
    text: `${message} (${rule})`,
  }]),
  deprecations: [''],
  invalidOptionWarnings: [''],
});

export const filenames = {
  logic(files: string[], result: Eslint.LintReport): Eslint.LintReport {
    const additionalWarnings = files
      .filter((file): boolean => !checkFilename(file))
      .map((file): Eslint.LintResult => createLogicWarning(file));

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
      .map((file): Stylelint.LintResult => createStyleWarning(file));

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
