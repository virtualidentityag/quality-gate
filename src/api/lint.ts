import { lintLogic } from './lint-logic';
import { lintStyle } from './lint-style';
import { Options, ParsedOptions, Result } from './types';
import { getConfig } from './config';
import { defaultOptions } from './defaults';

const toFalseOrString = (obj: string): false | string => (!obj ? false : obj);

const toArray = (obj: string): string[] => obj.split(',').filter((p): boolean => !!p);

const toBoolean = (obj?: boolean, obj2?: boolean): boolean => (obj !== undefined ? !!obj : !!obj2);

const parseOptions = (options: Partial<Options>): ParsedOptions => ({
  config: toFalseOrString(options.config || defaultOptions.config),
  pattern: toArray(options.pattern || defaultOptions.pattern),
  fix: toBoolean(options.fix, defaultOptions.fix),
  tests: toBoolean(options.tests, defaultOptions.tests),
  testExtension: options.testExtension || defaultOptions.testExtension,
  extLogic: toArray(options.extLogic || defaultOptions.extLogic),
  extStyle: toArray(options.extStyle || defaultOptions.extStyle),
});

export const lint = async (options: Partial<Options>): Promise<Result> => {
  const parsedOptions = parseOptions(options);
  const { logic, style } = getConfig(parsedOptions.config);

  return Promise.all([
    lintLogic(logic, parsedOptions),
    lintStyle(style, parsedOptions),
  ]).then(([logicResult, styleResult]): Result => ({
    logic: logicResult as Result['logic'],
    style: styleResult as Result['style'],
  }));
};
