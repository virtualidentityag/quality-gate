import { lint as Stylelint } from 'stylelint';

import { getConfigFile } from './config-file';
import { resolver } from './resolver';
import { LintOptions, LintResult } from './types';

export const lintStyle = ({ fix, pattern, config }: LintOptions): Promise<LintResult['style']> => Stylelint({
  fix,
  files: resolver(['.scss'], pattern),
  // eslint-disable-next-line global-require,import/no-dynamic-require
  config: require(getConfigFile('style', config)),
});
