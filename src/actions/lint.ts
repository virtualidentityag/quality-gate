import { existsSync } from 'fs';
import { resolve } from 'path';
import { run as tslint } from 'tslint/lib/runner';

import { Action } from './types';

const projectPath = resolve(process.cwd());
const biotopeBuildPath = resolve(`${projectPath}/node_modules/@biotope/build`);

const files = {
  tslint: existsSync(`${projectPath}/tslint.json`)
    ? `${projectPath}/tslint.json`
    : `${biotopeBuildPath}/tslint.json`,
  tsconfig: existsSync(`${projectPath}/tsconfig.json`)
    ? `${projectPath}/tsconfig.json`
    : `${biotopeBuildPath}/tsconfig.base.json`,
};

interface LintOptions {
  typescript?: boolean;
  javascript?: boolean;
  sass?: boolean;
  fix?: boolean;
}

const lint = (options: LintOptions) => {
  if (options.typescript) {
    tslint({
      config: files.tslint,
      project: files.tsconfig,
      files: ['**/*.{ts,tsx}'],
      exclude: ['**/node_modules/**'],
      fix: !!options.fix,
      format: 'verbose',
    }, console)
      .then((value) => {
        process.exit(value);
      })
      // tslint:disable-next-line:no-console
      .catch((error: Error) => console.error(error));
  }
  if (options.javascript) {
    // tslint:disable-next-line:no-console
    console.error('Not implemented yet…');
  }
  if (options.sass) {
    // tslint:disable-next-line:no-console
    console.error('Not implemented yet…');
  }
};

export const registerLint: Action = program => program
  .command('lint')
  .option('-t, --typescript', 'Lint typescript (*.ts) files')
  .option('-j, --javascript', 'Lint javascript (*.js) files')
  .option('-s, --sass', 'Lint sass (*.scss) files')
  .option('-f, --fix', 'Try to fix any erros found')
  .action(lint);
