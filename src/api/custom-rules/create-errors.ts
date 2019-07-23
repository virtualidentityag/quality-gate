import { resolve } from 'path';
import { CLIEngine as Eslint } from 'eslint';
import * as Stylelint from 'stylelint';

import { unfixStylelintTyping } from '../fix-stylelint-warning';

interface CustomError {
  file: string;
  message: string;
  rule?: string;
  line?: number;
  column?: number;
  isError?: boolean;
}

export const createLogicError = (error: CustomError): Eslint.LintResult => ({
  filePath: resolve(error.file),
  messages: [{
    ruleId: error.rule || '',
    severity: 1,
    message: error.message,
    nodeType: 'Program',
    line: error.line || 0,
    column: error.column || 0,
    source: '',
  }],
  errorCount: error.isError ? 1 : 0,
  warningCount: error.isError ? 0 : 1,
  fixableErrorCount: 0,
  fixableWarningCount: 0,
});

export const createStyleError = (error: CustomError): Stylelint.LintResult => ({
  source: resolve(error.file),
  errored: error.isError,
  ignored: false,
  warnings: unfixStylelintTyping([{
    line: error.line || 0,
    column: error.column || 0,
    rule: error.rule || '',
    severity: error.isError ? 'error' : 'warning',
    text: `${error.message}${error.rule ? ` (${error.rule})` : ''}`,
  }]),
  deprecations: [''],
  invalidOptionWarnings: [''],
});
