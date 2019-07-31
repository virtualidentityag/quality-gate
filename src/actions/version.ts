import { Command } from 'commander';

import { version } from '../../package.json';
import { Action } from './types';

export const registerVersion: Action = (program): Command => program.version(version as string);
