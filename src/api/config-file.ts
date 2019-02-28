import { resolve } from 'path';
import { existsSync } from 'fs';

import * as tsConfig from '../../tsconfig.json';
import { compile } from '../compile';

const CONFIG_DEFAULT_STYLE = `${__dirname}/../../.stylelintrc.json`;
const CONFIG_DEFAULT_LOGIC = `${__dirname}/../../config/recommended/index.js`;

const resolveStyleConfigFile = (configFile?: string): string => {
  if (configFile) {
    if (existsSync(resolve(configFile))) {
      return resolve(configFile);
    }
    throw new Error(`Cannot find configuration file: "${configFile}"`);
  }
  return resolve(CONFIG_DEFAULT_STYLE);
};

const resolveLogicConfigFile = (configFile?: string): string => {
  if (configFile) {
    if (existsSync(resolve(configFile))) {
      return resolve(configFile);
    }
    throw new Error(`Cannot find configuration file: "${configFile}"`);
  }
  return resolve(CONFIG_DEFAULT_LOGIC);
};

const isTsFile = (file: string): boolean => file.split('.').pop() === 'ts';

export const getConfigFile = (type: 'logic' | 'style', configFile?: string): string => {
  if (type === 'logic') {
    let actualConfigFile = resolveLogicConfigFile(configFile);

    if (isTsFile(actualConfigFile)) {
      compile([actualConfigFile], tsConfig);
      actualConfigFile = actualConfigFile.replace('.ts', '.js');
    }
    return actualConfigFile;
  }

  return resolveStyleConfigFile(configFile);
};
