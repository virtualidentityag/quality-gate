import { resolve } from 'path';
import { CLIEngine as Eslint } from 'eslint';
import * as Stylelint from 'stylelint';

export interface CustomError {
  file: string;
  message: string;
  rule?: string;
  line?: number;
  column?: number;
  isError?: boolean;
}

const createLogicError = (error: CustomError): Eslint.LintResult => ({
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

const createStyleError = (error: CustomError): Stylelint.LintResult => ({
  source: resolve(error.file),
  errored: error.isError,
  ignored: false,
  warnings: [{
    line: error.line || 0,
    column: error.column || 0,
    rule: error.rule || '',
    severity: error.isError ? 'error' : 'warning',
    text: `${error.message}${error.rule ? ` (${error.rule})` : ''}`,
  }],
  deprecations: [''],
  invalidOptionWarnings: [''],
});


export const updateLogicResults = (
  errors: CustomError[], result: Eslint.LintReport,
): Eslint.LintReport => {
  const mappedErrors = errors.map(createLogicError);
  const { errorCount, warningCount } = mappedErrors
    .reduce((counter, error): { errorCount: number; warningCount: number } => ({
      errorCount: counter.errorCount + error.errorCount,
      warningCount: counter.warningCount + error.warningCount,
    }), { errorCount: 0, warningCount: 0 });

  /* eslint-disable no-param-reassign */
  result.results = [
    ...mappedErrors,
    ...result.results
      .filter((res) => !res.messages.filter(({ ruleId }) => ruleId === 'filenames/match-regex').length),
  ];

  result.warningCount += warningCount;
  result.errorCount += errorCount;
  /* eslint-enable no-param-reassign */

  return result;
};

export const updateStyleResults = (
  errors: CustomError[], result: Stylelint.LinterResult,
): Stylelint.LinterResult => {
  // eslint-disable-next-line no-param-reassign
  result.results = [
    ...errors.map(createStyleError),
    ...result.results,
  ];

  // eslint-disable-next-line no-param-reassign
  result.output += JSON.stringify(result.results);

  return result;
};
