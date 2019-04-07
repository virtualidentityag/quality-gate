import { resolve } from 'path';
import { existsSync } from 'fs';
import { Linter as Eslint } from 'eslint';
// rewriting stylelint configuration as it does not contain '?' in all fields
// import { Configuration as StyleOptions } from 'stylelint';

import * as tsConfig from '../../tsconfig.json';
import { compile } from '../compile';

const CONFIG_DEFAULT = `${__dirname}/../../index.js`;

interface LogicOptions extends Eslint.Config {
  extends?: string[];
}

export interface Config {
  logic?: LogicOptions;
  // rewriting stylelint configuration as it does not contain '?' in all fields
  // style?: StyleOptions;
  style?: {
    rules?: Record<string, any>;
    extends?: string | string[];
    plugins?: string[];
    processors?: string[];
    ignoreFiles?: string | string[];
    defaultSeverity?: 'warning' | 'error';
  };
}

const resolveConfigFile = (configFile?: string): string => {
  if (configFile) {
    if (existsSync(resolve(configFile))) {
      return resolve(configFile);
    }
    throw new Error(`Cannot find configuration file: "${configFile}"`);
  }
  return resolve(CONFIG_DEFAULT);
};

const isTsFile = (file: string): boolean => file.split('.').pop() === 'ts';

export const getConfig = (configFile?: string): Config => {
  let actualConfigFile = resolveConfigFile(configFile);

  if (isTsFile(actualConfigFile)) {
    const fileNameSplit = actualConfigFile.split('.');
    fileNameSplit.pop();

    compile([actualConfigFile], tsConfig);
    actualConfigFile = `${fileNameSplit.join('.')}.js`;
  }
  // eslint-disable-next-line global-require,import/no-dynamic-require
  return require(actualConfigFile);
};
