import { CLIEngine as Eslint } from 'eslint';

import { Config } from './config';
import { resolver } from './resolver';
import { LintOptions, LintResult } from './types';
import { getExtensions, getTestExtensions } from './extensions';

export const lintLogic = (config: Config, options: LintOptions): Promise<LintResult['logic']> => {
  const extensions = getExtensions(options.typescript, options.javascript, options.includeJsx);
  const testExtensions = getTestExtensions(extensions);
  const baseConfig: Eslint.Options['baseConfig'] = {
    ...(options.includeJsx ? { parserOptions: { ecmaFeatures: { jsx: true } } } : {}),
    ...config.logic,
  };
  const extensionsToBeUsed = !options.spec ? extensions : testExtensions;
  const ignorePattern = !options.spec ? testExtensions.map((ext: string): string => `*${ext}`) : undefined;

  return new Promise<LintResult['logic']>((resolve): void => resolve(new Eslint({
    useEslintrc: false,
    baseConfig,
    fix: options.fix,
    extensions: extensionsToBeUsed,
    ignorePattern,
  }).executeOnFiles(resolver(extensionsToBeUsed, options.pattern)))).then((result): LintResult['logic'] => {
    if (result) {
      Eslint.outputFixes(result);
    }
    return result;
  });
};
