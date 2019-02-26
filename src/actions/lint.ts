import { resolve } from 'path';
import { CLIEngine as Eslint } from 'eslint';

import { getConfigFile } from '../config-file';
import { Action } from './types';

interface LintOptions {
  config?: string;
  pattern?: string;
  typescript?: boolean;
  javascript?: boolean;
  includeJsx?: boolean;
  sass?: boolean;
  fix?: boolean;
  spec?: boolean;
}

interface LintReport {
  logic?: Eslint.LintReport;
  style?: {};
}

const getJsxEtensions = (extensions: string[]): string[] => extensions.map(ext => `${ext}x`);
const getTestExtensions = (extensions: string[]): string[] => extensions.map(ext => `.spec${ext}`);

const getExtensions = (
  typescript?: boolean,
  javascript?: boolean,
  includeJsx?: boolean,
): string[] => {
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

const hasAnyLintingSet = ({
  javascript,
  typescript,
  sass,
}: LintOptions): boolean => !!javascript || !!typescript || !!sass;

const setDefaultOptions = (options: LintOptions): LintOptions => ({
  ...options,
  pattern: options.pattern || './',
  javascript: !hasAnyLintingSet(options) || options.javascript,
  typescript: !hasAnyLintingSet(options) || options.typescript,
});

const report = ({ logic, style }: LintReport): void => {
  const projectPath = resolve(process.cwd());
  let hasErrors = false;

  if (logic) {
    logic.results.forEach(error => error.messages.forEach((message) => {
      const fileName = error.filePath.replace(projectPath, '.');
      const line = `[${message.line}, ${message.column}]`;
      const rule = `(${message.ruleId})`;
      // eslint-disable-next-line no-console
      console.error(`${fileName} ${line}: ${message.message} ${rule}`);
      hasErrors = true;
    }));
  }

  if (style) {
    // eslint-disable-next-line no-console
    console.log('SCSS Reporting: Not implemented yet…');
  }

  if (hasErrors) {
    process.exit(1);
  }
};

const lint = (options: LintOptions): void => {
  const result: LintReport = {};
  const {
    config,
    pattern,
    typescript,
    javascript,
    includeJsx,
    sass,
    fix,
    spec,
  } = setDefaultOptions(options);

  const configFile = getConfigFile(config);

  if (typescript || javascript) {
    const extensions = getExtensions(typescript, javascript, includeJsx);
    const testExtensions = getTestExtensions(extensions);
    const patterns = (pattern && pattern.split(',').filter(p => !!p)) || [];
    const baseConfig: Eslint.Options['baseConfig'] = {
      ...(includeJsx ? { parserOptions: { ecmaFeatures: { jsx: true } } } : {}),
      // eslint-disable-next-line global-require,import/no-dynamic-require
      ...require(configFile),
    };

    result.logic = (new Eslint({
      useEslintrc: false,
      baseConfig,
      fix,
      extensions: !spec ? extensions : testExtensions,
      ignorePattern: !spec ? testExtensions.map(ext => `*${ext}`) : undefined,
    })).executeOnFiles(patterns);
  }

  if (sass) {
    // eslint-disable-next-line no-console
    console.log('SCSS Linting: Not implemented yet…');

    result.style = {};
  }

  report(result);
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
  .option('-e, --spec', 'Specify that the files being linted are tests (*.spec.*)')
  .action(lint);
