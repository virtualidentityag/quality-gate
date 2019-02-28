import { resolve } from 'path';
import { CLIEngine as Eslint } from 'eslint';
import * as Stylelint from 'stylelint';

import { LintResult } from './types';

interface ErrorContainer {
  errorCount?: number;
  warningCount?: number;
  errored?: boolean;
}

const textLog = (
  file: string,
  line: string,
  column: string,
  message: string,
  rule?: string,
): string => `${file} [${line}, ${column}]: ${message}${rule ? ` (${rule})` : ''}`;

const reportLogic = (report: Eslint.LintReport, projectPath: string, logger: Console['log']): void => report.results
  .forEach((error): void => error.messages.forEach((warning): void => logger(textLog(
    error.filePath.replace(projectPath, '.'),
    `${warning.line}`,
    `${warning.column}`,
    warning.message,
    `${warning.ruleId}`,
  ))));

const reportStyle = (report: Stylelint.LinterResult, projectPath: string, logger: Console['log']): void => report.results
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .forEach((result): void => (result.warnings as any[]).forEach((warning): void => logger(textLog(
    result.source.replace(projectPath, '.'),
    `${warning.line}`,
    `${warning.column}`,
    warning.text,
  ))));

const hasAnyErrors = (results: ErrorContainer[]): boolean => results.reduce(
  (
    value: boolean,
    { errorCount, warningCount, errored }: ErrorContainer,
  ) => value || !!errorCount || !!warningCount || !!errored,
  false,
);

export const report = ({ logic, style }: LintResult, logger?: Console['log']): boolean => {
  const projectPath = resolve(process.cwd());
  let hasErrors = false;

  if (logic) {
    // eslint-disable-next-line no-console
    reportLogic(logic, projectPath, logger || console.log);
    hasErrors = hasErrors || hasAnyErrors(logic.results);
  }

  if (style) {
    // eslint-disable-next-line no-console
    reportStyle(style, projectPath, logger || console.log);
    hasErrors = hasErrors || hasAnyErrors(style.results);
  }

  return hasErrors;
};
