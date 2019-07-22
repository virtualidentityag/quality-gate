import { CLIEngine as Eslint } from 'eslint';

import { resolver } from './resolver';
import { ParsedOptions, Config, Result } from './types';

const getExtensions = (options: ParsedOptions): string[] => (options.tests
  ? options.extLogic.map((ext): string => `${options.testExtension}${ext}`)
  : options.extLogic);

const jsxOptions = { parserOptions: { ecmaFeatures: { jsx: true } } };

const shouldIncludeJsxOptions = (extensions: string[]): boolean => ['.jsx', '.tsx']
  .some((ext): boolean => extensions.includes(ext));

export const lintLogic = async (config: Config['logic'], options: ParsedOptions): Promise<Result['logic']> => {
  const extensions = getExtensions(options);

  return new Promise<Result['logic']>((resolve): void => resolve(new Eslint({
    useEslintrc: false,
    baseConfig: {
      ...(shouldIncludeJsxOptions(options.extLogic) ? jsxOptions : {}),
      ...config,
    },
    fix: options.fix,
    extensions,
    ignorePattern: !options.tests
      ? extensions.map((ext): string => `*${options.testExtension}${ext}`)
      : undefined,
  }).executeOnFiles(resolver(extensions, options.pattern)))).then((result): Result['logic'] => {
    if (result) {
      Eslint.outputFixes(result);
    }
    return result;
  });
};
