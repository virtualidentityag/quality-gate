import { Options, lint, report } from '../api';
import { Action } from './types';

const lintAction = (options: Partial<Options>): Promise<void> => lint(options)
  .then((result): void => {
    if (report(result)) {
      process.exit(-1);
    }
  });

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const registerLint: Action = program => program
  .option('-c, --config <file>', 'Specify a configuration file (ts or js)')
  .option('-p, --pattern <patterns>', 'Specify patterns to run against (comma separated)')
  .option('-f, --fix', 'Try to fix any erros found')
  .option('-t, --tests', 'Specify that the files being linted are tests')
  .option('-e, --test-extension <extension>', 'Specify which extension to use on test files')
  .option('-l, --ext-logic <extensions>', 'Override default logic extensions (comma separated)')
  .option('-s, --ext-style <extensions>', 'Override default style extensions (comma separated)')
  .option('--skip-logic', 'Skip logic linting')
  .option('--skip-style', 'Skip style linting')
  .action(lintAction);
