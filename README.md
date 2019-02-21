# biotope-quality-gate

Coding quality and standards enforcer on biotope projects.

## Installing
- `npm i -D @biotope/quality-gate`

## Quick run
- `biotope-quality-gate lint`

which is the same as:
- `biotope-quality-gate lint --typescript --javascript --config ./node_modules/@biotope/quality-gate --pattern ./`

## Commands

### Lint

#### Configuration file
This options allows you to add your own configuration file, either built from scratch or based on
the recommended configuration given by the package (at `/` or `/config/recommended/`).
This file, if written in typescript, will be compiled to javascript before executing.
To use this option you can add `--config <file>` or through the shorthanded notation `-c`.
To extend a configuration or create your own from scratch, you just need to create a typescript or
javascript file and abide by the eslint configuration standards (for more info,
[`read this`][link-eslint-config]).

Example:
- `biotope-quality-gate lint --config ./my-config-file.ts`

#### Pattern
This option allows you to specify where to run the linter on. Several patterns can be specified by
separating them with commas (`,`).
To use this option you can add `--pattern <patterns>` or through the shorthanded notation `-p`.

Example:
- `biotope-quality-gate lint --pattern src,typings`

#### Typescript, Javascript, Sass and JSX
These options allow you to specify what should be linted by the application. When no option is
given, the application will assume that it has to lint both typescript and javascript files. If
either the typescript, javascript or sass options are given, the application will only lint these
types of files.
In the case of the JSX option, it will only take effect when at least one of the logic-based options
(typescript and javascript) options are given (or when none is given - remember, the default is
both!).
The typescript and javascript options will effectively ignore any files that match the regex
`*.spec.?s`. To lint tests, please see the option "Tests" of this README.
To use these options you can add `--typescript`, `--javascript` and `--sass` or through their
shorthanded notations `-t`, `-j` and `-s`, respectively.

Examples:
- `biotope-quality-gate lint` - will lint typescript and javascript files
- `biotope-quality-gate lint --typescript` - will only lint typescript files
- `biotope-quality-gate lint --javascript` - will only lint javascript files
- `biotope-quality-gate lint --include-jsx` - will lint typescript and javascript files, including the
ones with jsx and tsx extensions

**WARNING**: The `--sass` option is planned on the roadmap for the project but is not yet
implemented.

#### Fix
This option will try to fix any errors that it finds automatically. If there are errors it finds but
cannot fix them, it will report them as usual.
Typically, this option should not be used on any automated tests.
To use this option you can add `--fix` or through the shorthanded notation `-f`.

Examples:
- `biotope-quality-gate lint --fix`

#### Tests
This option will modify the extensions being searched for by adding `.spec` before the selected
options.
To use this option you can add `--spec` or through the shorthanded notation `-sp`.

Examples:
- `biotope-quality-gate lint --spec` - will lint files with the extensions `.spec.ts` and `.spec.js`

#### Help
This option will print these options to the console

## Troubleshooting

### NPM warnings on dependencies missing
If any dependencies appear to be missing when running the software, you should use
`npm install --flatten`. In this case, you might have installed a package that is also installing
some linting tools with it.



[link-eslint-config]: https://eslint.org/docs/user-guide/configuring
