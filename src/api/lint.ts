import { lintLogic } from './lint-logic';
import { lintStyle } from './lint-style';
import { LintOptions, LintResult } from './types';
import { getConfig } from './config';

const hasAnyLintingSet = ({
  javascript,
  typescript,
  sass,
}: LintOptions): boolean => !!javascript || !!typescript || !!sass;

const parseOptions = (options: LintOptions): LintOptions => ({
  ...options,
  pattern: options.pattern || './',
  javascript: !hasAnyLintingSet(options) || options.javascript,
  typescript: !hasAnyLintingSet(options) || options.typescript,
  sass: !hasAnyLintingSet(options) || options.sass,
});

export const lint = (options: LintOptions): Promise<LintResult> => {
  const parsedOptions = parseOptions(options);
  const config = getConfig(options.config);
  const linterPromises: Promise<LintResult['logic'] | LintResult['style']>[] = [];

  if (parsedOptions.sass) {
    linterPromises.push(lintStyle(config, parsedOptions));
  }

  if (parsedOptions.typescript || parsedOptions.javascript) {
    linterPromises.push(lintLogic(config, parsedOptions));
  }

  return new Promise((resolve): Promise<LintResult | void> => Promise.all(linterPromises)
    .then((promises): void => resolve({
      logic: (parsedOptions.sass ? promises[1] : promises[0]) as LintResult['logic'],
      style: parsedOptions.sass ? promises[0] as LintResult['style'] : undefined,
    })));
};
