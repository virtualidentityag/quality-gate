import { lint, LinterOptions, LinterResult } from 'stylelint';

import { resolver } from './resolver';
import { ParsedOptions, Config, Result } from './types';

interface CorrectedOptions extends LinterOptions {
  allowEmptyInput: boolean;
}

const Stylelint = (options: Partial<CorrectedOptions>): Promise<LinterResult> => lint(options);

export const lintStyle = async (config: Config['style'], options: ParsedOptions): Promise<Result['style']> => Stylelint({
  fix: options.fix,
  files: resolver(options.extStyle, options.pattern),
  config,
  allowEmptyInput: true,
});
