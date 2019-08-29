import { resolve } from 'path';
import { CLIEngine as Eslint } from 'eslint';
import * as Stylelint from 'stylelint';

import { Result } from './types';

interface ErrorContainer {
  errorCount?: number;
  warningCount?: number;
  errored?: boolean;
}

const sortByLineColumn = (warnings: Stylelint.Warning[]): Stylelint.Warning[] => warnings
  .sort((left, right) => {
    if (left.line !== right.line) {
      return left.line > right.line ? 1 : -1;
    }
    return left.column >= right.column ? 1 : -1;
  });

const textLog = (
  file: string,
  line: string,
  column: string,
  message: string,
  rule?: string,
): string => `${file}${line && column ? ` [${line}, ${column}]` : ''}: ${message}${rule ? ` (${rule})` : ''}`;

const reportLogic = (report: Eslint.LintReport, projectPath: string, logger: Console['log']): void => report.results
  .reduce((accumulator, result) => ([
    ...accumulator,
    {
      filePath: result.filePath.replace(projectPath, '.'),
      messages: result.messages.filter((message) => message.ruleId),
    },
  ]), [])
  .forEach(({ messages, filePath }) => messages.forEach((message) => logger(
    textLog(filePath, `${message.line || ''}`, `${message.column || ''}`, message.message, `${message.ruleId || ''}`),
  )));

const reportStyle = (report: Stylelint.LinterResult, projectPath: string, logger: Console['log']): void => report.results
  .map((result) => ({
    source: result.source.replace(projectPath, '.'),
    warnings: sortByLineColumn(result.warnings),
  }))
  .forEach(({ source, warnings }) => warnings.forEach((warning) => logger(
    textLog(source, `${warning.line || ''}`, `${warning.column || ''}`, warning.text),
  )));

const hasAnyErrors = (results: ErrorContainer[], ignoreWarnings: boolean): boolean => results
  .reduce(
    (value: boolean, { errorCount, warningCount, errored }: ErrorContainer): boolean => value
      || !!errorCount || !!errored || (!ignoreWarnings && !!warningCount),
    false,
  );

// eslint-disable-next-line no-console
export const report = ({ options, logic, style }: Result, logger: Console['log'] = console.log): boolean => {
  const projectPath = resolve(process.cwd());
  let hasErrors = false;

  if (logic) {
    reportLogic(logic, projectPath, logger);
    hasErrors = hasErrors || hasAnyErrors(logic.results, options.ignoreWarnings);
  }

  if (style) {
    reportStyle(style, projectPath, logger);
    hasErrors = hasErrors || hasAnyErrors(style.results, options.ignoreWarnings);
  }

  return hasErrors;
};
