import { CLIEngine as Eslint } from 'eslint';

import { getConfigFile } from '../config-file';
import { LintOptions, LintReport } from './types';

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

export const lint = (options: LintOptions): LintReport => {
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

  return result;
};
