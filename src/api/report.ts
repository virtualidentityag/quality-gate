import { resolve } from 'path';
import { CLIEngine as Eslint } from 'eslint';

import { LintReport } from './types';

const reportLogic = (report: Eslint.LintReport, projectPath: string, logger: Console['log']): void => report.results
  .forEach((error): void => error.messages.forEach((message): void => {
    const fileName = error.filePath.replace(projectPath, '.');
    const line = `[${message.line}, ${message.column}]`;
    const rule = `(${message.ruleId})`;
    logger(`${fileName} ${line}: ${message.message} ${rule}`);
  }));

export const report = ({ logic, style }: LintReport, logger?: Console['log']): boolean => {
  const projectPath = resolve(process.cwd());
  let hasErrors = false;

  if (logic) {
    // eslint-disable-next-line no-console
    reportLogic(logic, projectPath, logger || console.log);
    hasErrors = hasErrors || logic.results
      .reduce((errors, { errorCount }) => errors || !!errorCount, false);
  }

  if (style) {
    // eslint-disable-next-line no-console
    console.log('SCSS Reporting: Not implemented yet…');
  }

  return hasErrors;
};
