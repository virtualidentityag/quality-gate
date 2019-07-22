import { lint, LinterOptions } from 'stylelint';

import { resolver } from './resolver';
import { ParsedOptions, Config, Result } from './types';

interface CorrectedLinterOptions extends LinterOptions {
  allowEmptyInput?: boolean;
}

const Stylelint: (options: Partial<CorrectedLinterOptions>) => Promise<Result['style']> = lint;

export const lintStyle = async (config: Config['style'], options: ParsedOptions): Promise<Result['style']> => Stylelint({
  fix: options.fix,
  files: resolver(options.extStyle, options.pattern),
  config,
  allowEmptyInput: true,
});
