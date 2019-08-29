import { CLIEngine as Eslint } from 'eslint';

import { resolver } from './resolver';
import { ParsedOptions, Config } from './types';
import { customRules } from './custom-rules';

const getExtensions = (options: ParsedOptions): string[] => (options.tests
  ? options.extLogic.map((ext) => `${options.testExtension}${ext}`)
  : options.extLogic);

const jsxExtensions = ['.jsx', '.tsx'];

const jsxOptions = { parserOptions: { ecmaFeatures: { jsx: true } } };

const shouldIncludeJsxOptions = (extensions: string[]): boolean => jsxExtensions
  .some((ext) => extensions.includes(ext));

export const lintLogic = async (config: Config['logic'], options: ParsedOptions): Promise<Eslint.LintReport> => {
  const extensions = getExtensions(options);
  const ignorePatternExtentions = extensions.map((ext) => `${options.testExtension}${ext}$`);
  const files = resolver(extensions, options.pattern);
  const filteredFiles = !options.tests
    ? files.filter((file) => !ignorePatternExtentions.some((ext) => (new RegExp(ext)).test(file)))
    : files;

  return new Promise<Eslint.LintReport>((resolve): void => resolve(new Eslint({
    useEslintrc: false,
    baseConfig: {
      ...(shouldIncludeJsxOptions(options.extLogic) ? jsxOptions : {}),
      ...config,
    },
    fix: options.fix,
    extensions,
  }).executeOnFiles(filteredFiles))).then((result): Eslint.LintReport => {
    if (result.fixableErrorCount + result.fixableWarningCount) {
      Eslint.outputFixes(result);
    }

    customRules('logic', files, result);
    return result;
  });
};
