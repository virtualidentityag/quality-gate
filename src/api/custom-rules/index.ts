import { CLIEngine as Eslint } from 'eslint';
import * as Stylelint from 'stylelint';

import { filenames } from './filenames';

interface Rule {
  logic: (files: string[], result: Eslint.LintReport) => void;
  style: (files: string[], result: Stylelint.LinterResult) => void;
}

const rules: Rule[] = [
  filenames as Rule,
];

const runLogic = (files: string[], result: Eslint.LintReport): void => rules
  .forEach(({ logic }) => logic(files, result));

const runStyle = (files: string[], result: Stylelint.LinterResult): void => rules
  .forEach(({ style }) => style(files, result));

export const customRules = (
  type: 'logic' | 'style', files: string[], result: Eslint.LintReport | Stylelint.LinterResult,
): void => (type === 'logic'
  ? runLogic(files, result as Eslint.LintReport)
  : runStyle(files, result as Stylelint.LinterResult));
