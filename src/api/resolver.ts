import { statSync } from 'fs';
import { resolve } from 'path';
import { sync as glob } from 'glob';

export const resolver = (extensions: string[], pattern: string[]): string[] => pattern
  .map((item): string => (item.indexOf('*') < 0 && statSync(item).isDirectory() ? `${item}/**/*` : item))
  .map((item): string[] => glob(item))
  .reduce((accumulator, p): string[] => ([
    ...accumulator,
    ...p,
  ]), [])
  .filter((p): boolean => p.indexOf('node_modules') < 0)
  .filter((item): boolean => extensions.reduce((hasExt, ext): boolean => item.split(ext).pop() === '' || hasExt, false))
  .map((item): string => resolve(item));
