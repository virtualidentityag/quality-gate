import { statSync } from 'fs';
import { resolve } from 'path';
import { sync as glob } from 'glob';

const patternList = (pattern?: string): string[] => (pattern && pattern.split(',').filter(p => !!p)) || [];

export const resolver = (extensions: string[], pattern?: string): string[] => patternList(pattern)
  .map(item => (item.indexOf('*') < 0 && statSync(item).isDirectory() ? `${item}/**/*` : item))
  .map(item => glob(item))
  .reduce((accumulator, p) => ([
    ...accumulator,
    ...p,
  ]), [])
  .filter(p => p.indexOf('node_modules') < 0)
  .filter(item => extensions.reduce((hasExt, ext) => item.split(ext).pop() === '' || hasExt, false))
  .map(item => resolve(item));
