import { resolve } from 'path';
import { existsSync, readFileSync } from 'fs';

import * as tsConfig from '../../tsconfig.json';
import { compile } from '../compile';
import { ParsedOptions, Config } from './types';

const CONFIG_DEFAULT = `${__dirname}/../../index.js`;
const eslintConfigFile = '.eslintrc';
const stylelintConfigFile = '.stylelintrc';

type OptionType = 'logic' | 'style';

type AnyConfig = Config['logic'] | Config['style'];

const getSingleConfig = (type: OptionType, configFile?: string): AnyConfig => {
  const fileName = type === 'logic' ? eslintConfigFile : stylelintConfigFile;
  // eslint-disable-next-line global-require,import/no-dynamic-require
  const defaultObject = require(resolve(CONFIG_DEFAULT))[type];

  if (configFile) {
    if (existsSync(resolve(configFile))) {
      // eslint-disable-next-line global-require,import/no-dynamic-require
      return require(resolve(configFile))[type] || defaultObject;
    }
    throw new Error(`Cannot find configuration file: "${configFile}"`);
  }
  if (existsSync(resolve(fileName))) {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    return JSON.parse(readFileSync(resolve(fileName)).toString());
  }
  return defaultObject;
};

const isTsFile = (file: string): boolean => file.split('.').pop() === 'ts';

export const getConfig = (configFile: ParsedOptions['config']): Config => {
  let actualConfigFile = '';

  if (configFile) {
    actualConfigFile = resolve(configFile);

    if (actualConfigFile && isTsFile(actualConfigFile)) {
      compile([actualConfigFile], tsConfig);

      const [, ...fileNameSplit] = actualConfigFile.split('.').reverse();
      actualConfigFile = `${fileNameSplit.reverse().join('.')}.js`;
    }
  }

  return {
    logic: getSingleConfig('logic', actualConfigFile) as Config['logic'],
    style: getSingleConfig('style', actualConfigFile) as Config['style'],
  };
};
