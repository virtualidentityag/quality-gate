import { StylelintWarning } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fixStylelintTyping = (warnings: string[]): StylelintWarning[] => (warnings as any);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const unfixStylelintTyping = (warnings: StylelintWarning[]): string[] => (warnings as any);
