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
  .sort((left: Stylelint.Warning, right: Stylelint.Warning): number => {
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
  .forEach((error): void => error.messages.forEach((warning): void => {
    if (warning.ruleId) {
      logger(textLog(
        error.filePath.replace(projectPath, '.'),
        `${warning.line || ''}`,
        `${warning.column || ''}`,
        warning.message,
        `${warning.ruleId || ''}`,
      ));
    }
  }));

const reportStyle = (report: Stylelint.LinterResult, projectPath: string, logger: Console['log']): void => report.results
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  .map(result => ({
    ...result,
    warnings: sortByLineColumn(result.warnings),
  }))
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  .forEach(result => result.warnings.forEach((warning): void => logger(textLog(
    result.source.replace(projectPath, '.'),
    `${warning.line || ''}`,
    `${warning.column || ''}`,
    warning.text,
  ))));

const hasAnyErrors = (
  results: ErrorContainer[],
  ignoreWarnings: boolean,
): boolean => results.reduce(
  (
    value: boolean,
    { errorCount, warningCount, errored }: ErrorContainer,
  ): boolean => value || !!errorCount || !!errored || (!ignoreWarnings && !!warningCount),
  false,
);

// eslint-disable-next-line no-console
export const report = ({ logic, style }: Partial<Result>, ignoreWarnings: boolean, logger: Console['log'] = console.log): boolean => {
  const projectPath = resolve(process.cwd());
  let hasErrors = false;

  if (logic) {
    reportLogic(logic, projectPath, logger);
    hasErrors = hasErrors || hasAnyErrors(logic.results, ignoreWarnings);
  }

  if (style) {
    reportStyle(style, projectPath, logger);
    hasErrors = hasErrors || hasAnyErrors(style.results, ignoreWarnings);
  }

  return hasErrors;
};
