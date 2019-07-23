import { lint, LinterOptions, LinterResult } from 'stylelint';

import { resolver } from './resolver';
import { ParsedOptions, Config, Result } from './types';
import { customRules } from './custom-rules';

interface CorrectedLinterOptions extends LinterOptions {
  allowEmptyInput?: boolean;
}

const Stylelint: (options: Partial<CorrectedLinterOptions>) => Promise<Result['style']> = lint;

export const lintStyle = async (config: Config['style'], options: ParsedOptions): Promise<Result['style']> => {
  const files = resolver(options.extStyle, options.pattern);

  return Stylelint({
    fix: options.fix,
    files,
    config,
    allowEmptyInput: true,
  }).then((result): LinterResult => {
    customRules('style', files, result);
    return result;
  });
};
