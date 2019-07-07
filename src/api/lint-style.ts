import { lint, LinterOptions, LinterResult } from 'stylelint';

import { Config } from './config';
import { resolver } from './resolver';
import { LintOptions, LintResult } from './types';

interface CorrectedOptions extends LinterOptions {
  allowEmptyInput: boolean;
}

const Stylelint = (options: Partial<CorrectedOptions>): Promise<LinterResult> => lint(options);

export const lintStyle = (config: Config, options: LintOptions): Promise<LintResult['style']> => Stylelint({
  fix: options.fix,
  files: resolver(['.scss', '.css'], options.pattern),
  config: config.style,
  allowEmptyInput: true,
});
