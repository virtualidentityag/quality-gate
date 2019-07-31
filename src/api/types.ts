import { Linter, CLIEngine } from 'eslint';
import { Configuration, LinterResult } from 'stylelint';

export interface Options {
  config: string;
  pattern: string;
  fix: boolean;
  tests: boolean;
  testExtension: string;
  extLogic: string;
  extStyle: string;
  skipLogic: boolean;
  skipStyle: boolean;
  ignoreWarnings: boolean;
}

export interface ParsedOptions {
  config: string | false;
  pattern: string[];
  fix: boolean;
  tests: boolean;
  testExtension: string;
  extLogic: string[];
  extStyle: string[];
  skipLogic: boolean;
  skipStyle: boolean;
  ignoreWarnings: boolean;
}

export interface PartialLogicOptions extends Linter.Config {
  extends?: string[];
}

export interface Config {
  logic?: PartialLogicOptions;
  style?: Partial<Configuration>;
}

export interface Result {
  options: ParsedOptions;
  logic?: CLIEngine.LintReport;
  style?: LinterResult;
}
