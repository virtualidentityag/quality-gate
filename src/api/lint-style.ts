import { lint as Stylelint } from 'stylelint';

import { Config } from './config';
import { resolver } from './resolver';
import { LintOptions, LintResult } from './types';

export const lintStyle = (config: Config, options: LintOptions): Promise<LintResult['style']> => Stylelint({
  fix: options.fix,
  files: resolver(['.scss', '.css'], options.pattern),
  config: config.style,
});
