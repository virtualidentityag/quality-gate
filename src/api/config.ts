import { resolve } from 'path';
import { existsSync, readFileSync } from 'fs';
import { Linter as Eslint } from 'eslint';
// rewriting stylelint configuration as it does not contain '?' in all fields
// import { Configuration as StyleOptions } from 'stylelint';

import * as tsConfig from '../../tsconfig.json';
import { compile } from '../compile';

const CONFIG_DEFAULT = `${__dirname}/../../index.js`;
const eslintConfigFile = '.eslintrc';
const stylelintConfigFile = '.stylelintrc';

type OptionType = 'logic' | 'style';

interface LogicOptions extends Eslint.Config {
  extends?: string[];
}

export interface Config {
  logic?: LogicOptions;
  // rewriting stylelint configuration as it does not contain '?' in all fields
  // style?: StyleOptions;
  style?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rules?: Record<string, any>;
    extends?: string | string[];
    plugins?: string[];
    processors?: string[];
    ignoreFiles?: string | string[];
    defaultSeverity?: 'warning' | 'error';
  };
}

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

export const getConfig = (configFile?: string): Config => {
  let actualConfigFile = '';

  if (configFile) {
    actualConfigFile = resolve(configFile);

    if (actualConfigFile && isTsFile(actualConfigFile)) {
      const fileNameSplit = actualConfigFile.split('.');
      fileNameSplit.pop();

      compile([actualConfigFile], tsConfig);
      actualConfigFile = `${fileNameSplit.join('.')}.js`;
    }
  }

  return {
    logic: getSingleConfig('logic', actualConfigFile) as Config['logic'],
    style: getSingleConfig('style', actualConfigFile) as Config['style'],
  };
};
