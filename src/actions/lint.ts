import * as packageJson from '../../package.json';
import { resolve } from 'path';
import { CLIEngine as eslint } from 'eslint';

import { Action } from './types';

const projectPath = resolve(process.cwd());
const selfPath = resolve(`${projectPath}/node_modules/${packageJson.name}`);

interface LintOptions {
  configFile?: string;
  pattern?: string;
  typescript?: boolean;
  javascript?: boolean;
  includeJsx?: boolean;
  sass?: boolean;
  fix?: boolean;
  spec?: boolean;
}

interface LintReport {
  logic?: eslint.LintReport;
  style?: {};
}

const getJsxEtensions = (extensions: string[]) => extensions.map(ext => `${ext}x`);
const getTestExtensions = (extensions: string[]) => extensions.map(ext => `.spec${ext}`);

const getExtensions = (typescript?: boolean, javascript?: boolean, includeJsx?: boolean) => {
  let extensions: string[] = [];
  if (typescript) {
    extensions.push('.ts');
  }
  if (javascript) {
    extensions.push('.js');
  }
  if (includeJsx) {
    extensions = extensions.concat(getJsxEtensions(extensions));
  }
  return extensions;
};

const lint = (options: LintOptions) => {
  const result: LintReport = {};

  if (options.typescript || options.javascript) {
    const extensions = getExtensions(options.typescript, options.javascript, options.includeJsx);
    const testExtensions = getTestExtensions(extensions);
    const patterns = (options.pattern && options.pattern.split(',').filter(p => !!p)) || [];
    const baseConfig: eslint.Options['baseConfig'] = {
      extends: `${selfPath}/.eslintrc.base.json`,
      env: { browser: true },
      ...(options.includeJsx ? { parserOptions: { ecmaFeatures: { jsx: true } } } : {}),
    };

    result.logic = (new eslint({
      ...(!options.configFile ? { baseConfig } : {
        configFile: options.configFile,
      }),
      fix: !!options.fix,
      extensions: !options.spec ? extensions : testExtensions,
      ignorePattern: !options.spec ? testExtensions.map(ext => `*${ext}`) : undefined,
    })).executeOnFiles(patterns);
  }

  if (options.sass) {
    // tslint:disable-next-line:no-console
    console.error('SCSS Linting: Not implemented yet…');

    result.style = {};
  }

  report(result);
};

const report = ({ logic, style }: LintReport) => {
  if (logic) {
    logic.results.forEach(error => error.messages.forEach(({ line, column, message }) => {
      // tslint:disable-next-line:no-console
      console.error(`${error.filePath.replace(projectPath, '')} [${line}, ${column}]: ${message}`);
    }));
  }

  if (style) {
    // tslint:disable-next-line:no-console
    console.error('SCSS Reporting: Not implemented yet…');
  }
};

export const registerLint: Action = program => program
  .command('lint')
  .option('-c, --config-file <file>', 'Specify a configuration file')
  .option('-p, --pattern <patterns>', 'Specify patterns to run against (comma separated)')
  .option('-t, --typescript', 'Include typescript files (*.ts)')
  .option('-j, --javascript', 'Include javascript files (*.js)')
  .option('-x, --include-jsx', 'Include jsx files (*.?sx)')
  .option('-s, --sass', 'Include sass files (*.scss)')
  .option('-f, --fix', 'Try to fix any erros found')
  .option('-sp, --spec', 'Specify that the files being linted are tests (*.spec.*)')
  .action(lint);
