import { resolve } from 'path';
import { existsSync } from 'fs';

import * as tsConfig from '../tsconfig.json';
import { compile } from './compile';

const CONFIG_DEFAULT = `${__dirname}/../config/recommended/index.js`;

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

export const getConfigFile = (configFile?: string): string => {
  let actualConfigFile = resolveConfigFile(configFile);

  if (isTsFile(actualConfigFile)) {
    compile([actualConfigFile], tsConfig);
    actualConfigFile = actualConfigFile.replace('.ts', '.js');
  }
  return actualConfigFile;
};
