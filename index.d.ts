
declare module '@biotope/quality-gate' {
  interface LogicOptions {
    allowInlineConfig?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    baseConfig?: false | { [name: string]: any };
    cache?: boolean;
    cacheFile?: string;
    cacheLocation?: string;
    configFile?: string;
    cwd?: string;
    envs?: string[];
    extensions?: string[];
    fix?: boolean;
    globals?: string[];
    ignore?: boolean;
    ignorePath?: string;
    ignorePattern?: string | string[];
    useEslintrc?: boolean;
    parser?: string;
    // Type modified from the original file
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parserOptions?: any;
    plugins?: string[];
    rules?: {
      // Type modified from the original file
      [name: string]: null | boolean | string | (string | object)[];
    };
    rulePaths?: string[];
    reportUnusedDisableDirectives?: boolean;
  }

  interface StyleOptions {
    extends?: string | string[];
    plugins?: string[];
    processors?: string[];
    ignoreFiles?: string[];
    defaultSeverity?: 'warning' | 'error';
    rules?: {
      [name: string]: null | boolean | string | (string | object)[];
    };
  }

  interface Options {
    logic: LogicOptions;
    style: StyleOptions;
  }

  const options: Options;
  export = options;
}
