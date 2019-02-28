import { CLIEngine as Eslint } from 'eslint';

import { getConfigFile } from './config-file';
import { resolver } from './resolver';
import { LintOptions, LintResult } from './types';
import { getExtensions, getTestExtensions } from './extensions';

export const lintLogic = ({
  typescript,
  javascript,
  includeJsx,
  fix,
  spec,
  pattern,
  config,
}: LintOptions): Promise<LintResult['logic']> => {
  const configFile = getConfigFile('logic', config);
  const extensions = getExtensions(typescript, javascript, includeJsx);
  const testExtensions = getTestExtensions(extensions);
  const baseConfig: Eslint.Options['baseConfig'] = {
    ...(includeJsx ? { parserOptions: { ecmaFeatures: { jsx: true } } } : {}),
    // eslint-disable-next-line global-require,import/no-dynamic-require
    ...require(configFile),
  };
  const extensionsToBeUsed = !spec ? extensions : testExtensions;
  const ignorePattern = !spec ? testExtensions.map(ext => `*${ext}`) : undefined;

  return new Promise(resolve => resolve(new Eslint({
    useEslintrc: false,
    baseConfig,
    fix,
    extensions: extensionsToBeUsed,
    ignorePattern,
  }).executeOnFiles(resolver(extensionsToBeUsed, pattern))));
};
