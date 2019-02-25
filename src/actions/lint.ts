import { LintOptions, lint, report } from '../api';
import { Action } from './types';

const lintAction = (options: LintOptions): void => {
  if (report(lint(options))) {
    process.exit(-1);
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const registerLint: Action = program => program
  .command('lint')
  .option('-c, --config <file>', 'Specify a configuration file (ts or js)')
  .option('-p, --pattern <patterns>', 'Specify patterns to run against (comma separated)')
  .option('-t, --typescript', 'Include typescript files (*.ts)')
  .option('-j, --javascript', 'Include javascript files (*.js)')
  .option('-x, --include-jsx', 'Include jsx files (*.?sx)')
  .option('-s, --sass', 'Include sass files (*.scss)')
  .option('-f, --fix', 'Try to fix any erros found')
  .option('-sp, --spec', 'Specify that the files being linted are tests (*.spec.*)')
  .action(lintAction);
