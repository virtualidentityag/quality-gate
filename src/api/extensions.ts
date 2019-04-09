
const getJsxEtensions = (extensions: string[]): string[] => extensions.map((ext: string): string => `${ext}x`);

export const getExtensions = (
  typescript?: boolean,
  javascript?: boolean,
  includeJsx?: boolean,
): string[] => {
  let extensions: string[] = [];
  if (typescript) {
    extensions.push('.ts');
  }
  if (javascript) {
    extensions.push('.js');
  }
  if (includeJsx) {
    extensions = extensions.concat(getJsxEtensions(extensions));
  }
  return extensions;
};

export const getTestExtensions = (extensions: string[]): string[] => extensions.map((ext: string): string => `.spec${ext}`);
