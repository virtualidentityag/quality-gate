import { resolve } from 'path';
import { existsSync } from 'fs';

import * as tsConfig from '../../tsconfig.json';
import { compile } from '../compile';

const CONFIG_DEFAULT = `${__dirname}/../../index.js`;

interface StyleConfig extends IndexObjectAny, JSON {}

export interface Config {
  logic: IndexObjectAny;
  style: StyleConfig;
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
