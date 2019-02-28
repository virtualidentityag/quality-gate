import { resolve } from 'path';
import { existsSync } from 'fs';

import * as tsConfig from '../../tsconfig.json';
import { compile } from '../compile';

const CONFIG_FOLDER = `${__dirname}/../../config`;
const CONFIG_DEFAULT_STYLE = `${CONFIG_FOLDER}/style/index.js`;
const CONFIG_DEFAULT_LOGIC = `${CONFIG_FOLDER}/logic/index.js`;

const resolveConfigFile = (type: 'logic' | 'style', configFile?: string): string => {
  if (configFile) {
    if (existsSync(resolve(configFile))) {
      return resolve(configFile);
    }
    throw new Error(`Cannot find configuration file: "${configFile}"`);
  }
  return resolve(type === 'logic' ? CONFIG_DEFAULT_LOGIC : CONFIG_DEFAULT_STYLE);
};

const isTsFile = (file: string): boolean => file.split('.').pop() === 'ts';

export const getConfigFile = (type: 'logic' | 'style', configFile?: string): string => {
  let actualConfigFile = resolveConfigFile(type, configFile);

  if (isTsFile(actualConfigFile)) {
    const fileNameSplit = actualConfigFile.split('.');
    fileNameSplit.pop();

    compile([actualConfigFile], tsConfig);
    actualConfigFile = `${fileNameSplit.join('.')}.js`;
  }
  return actualConfigFile;
};
