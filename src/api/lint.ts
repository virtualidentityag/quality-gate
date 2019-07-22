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
  skipLogic: toBoolean(options.skipLogic, defaultOptions.skipLogic),
  skipStyle: toBoolean(options.skipStyle, defaultOptions.skipStyle),
});

export const lint = async (options: Partial<Options>): Promise<Partial<Result>> => {
  const parsedOptions = parseOptions(options);
  const { logic, style } = getConfig(parsedOptions.config);

  const linterPromises: Promise<Result['logic'] | Result['style']>[] = [];
  let stylePosition = 0;
  if (!parsedOptions.skipLogic) {
    linterPromises.push(lintLogic(logic, parsedOptions));
    stylePosition = 1;
  }
  if (!parsedOptions.skipStyle) {
    linterPromises.push(lintStyle(style, parsedOptions));
  } else {
    stylePosition = -1;
  }

  return Promise.all(linterPromises).then((values): Partial<Result> => ({
    ...(!parsedOptions.skipLogic ? { logic: values[0] as Result['logic'] } : {}),
    ...(stylePosition >= 0 ? { style: values[stylePosition] as Result['style'] } : {}),
  }));
};
