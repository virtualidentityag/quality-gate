import { CLIEngine as Eslint } from 'eslint';

import { resolver } from './resolver';
import { ParsedOptions, Config, Result } from './types';
import { filenames } from './rules';

const getExtensions = (options: ParsedOptions): string[] => (options.tests
  ? options.extLogic.map((ext): string => `${options.testExtension}${ext}`)
  : options.extLogic);

const jsxOptions = { parserOptions: { ecmaFeatures: { jsx: true } } };

const shouldIncludeJsxOptions = (extensions: string[]): boolean => ['.jsx', '.tsx']
  .some((ext): boolean => extensions.includes(ext));

export const lintLogic = async (config: Config['logic'], options: ParsedOptions): Promise<Result['logic']> => {
  const extensions = getExtensions(options);
  const files = resolver(extensions, options.pattern);

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
  }).executeOnFiles(files))).then((result): Result['logic'] => {
    filenames.logic(files, result);

    if (result.fixableErrorCount + result.fixableWarningCount) {
      Eslint.outputFixes(result);
    }
    return result;
  });
};
