import { CLIEngine as Eslint } from 'eslint';

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

export interface LintReport {
  logic?: Eslint.LintReport;
  style?: {};
}
