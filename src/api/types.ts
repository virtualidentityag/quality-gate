import { CLIEngine as Eslint } from 'eslint';
import * as Stylelint from 'stylelint';

export interface LintOptions {
  config?: string;
  pattern?: string;
  typescript?: boolean;
  javascript?: boolean;
  includeJsx?: boolean;
  sass?: boolean;
  fix?: boolean;
  spec?: boolean;
}

export interface LintResult {
  logic?: Eslint.LintReport;
  style?: Stylelint.LinterResult;
}
