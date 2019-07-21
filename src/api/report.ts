import { resolve } from 'path';
import { CLIEngine as Eslint } from 'eslint';
import * as Stylelint from 'stylelint';

import { Result } from './types';

interface ErrorContainer {
  errorCount?: number;
  warningCount?: number;
  errored?: boolean;
}

interface StylelintWarning {
  line: number;
  column: number;
  text: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fixStylelintTyping = (warnings: string[]): StylelintWarning[] => (warnings as any);

const sortByLineColumn = (warnings: string[]): StylelintWarning[] => fixStylelintTyping(warnings)
  .sort((left: StylelintWarning, right: StylelintWarning): number => {
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
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  .map(result => ({
    ...result,
    warnings: sortByLineColumn(result.warnings),
  }))
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  .forEach(result => result.warnings.forEach((warning): void => logger(textLog(
    result.source.replace(projectPath, '.'),
    `${warning.line}`,
    `${warning.column}`,
    warning.text,
  ))));

const hasAnyErrors = (results: ErrorContainer[]): boolean => results.reduce(
  (
    value: boolean,
    { errorCount, errored }: ErrorContainer,
  ): boolean => value || !!errorCount || !!errored,
  false,
);

export const report = ({ logic, style }: Result, logger?: Console['log']): boolean => {
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
