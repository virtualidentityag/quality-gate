# biotope-quality-gate

Coding quality and standards enforcer on biotope projects.

## Installing
- `npm i -D @biotope/quality-gate`

## Quick run
- `biotope-quality-gate lint`

which is the same as:
- `biotope-quality-gate lint --typescript --javascript --config ./node_modules/@biotope/quality-gate --pattern ./`

## Disabling rules
You can disable rules for a certain file, line or group of lines, the same way you do on eslint and
on stylelint. In that sense, you can use the same mechanisms, like:
- `// eslint-disable-next-line logic-rule-one,logic-rule-two`
- `// eslint-disable logic-rule-three`
- ...
- `/* stylelint-disable-next-line style-rule-one,style-rule-two */`
- `/* stylelint-disable style-rule-three */`
- ...

You can read more about this [here][link-eslint-disable] and [here][link-stylelint-config].

## Commands

### Lint

#### Configuration file
This option allows you to add your own configuration file, either built from scratch or based on the
recommended configuration given by the package.
The package gives you two recommended configurations, one for logic (javascript and typescript) and
another for style, both written in a `js` format, located at `/config`.
Any configuration file given, if written in typescript, will be compiled before executing.
To use this option you can add `--config <file>` or through the shorthanded notation `-c`.
To extend a configuration or create your own from scratch, you just need to create a typescript or
javascript file and abide by the eslint or styleint configuration standards for logic and style,
respectively. For more info, [read this][link-eslint-config] and [this][link-stylelint-config]).

Custom configuration file example:
```typescript
// my-linting-rules.ts
import * as config from '@biotope/quality-gate';

const options: typeof config = {
  logic: {
    ...config.logic,
    // Add any other definition here. Example:
    // globals: {
    //   MY_GLOBAL_VARIABLE: true,
    // },
  },
  style: {
    ...config.style,
    // Add any other definition here. Example:
    // rules: {
    //   ...config.style.rules,
    //   'unit-whitelist': ['em', 'rem', '%', 's'],
    // },
  },
};

export = options;
```
and then run it with:
- `biotope-quality-gate lint --config ./my-linting-rules.ts`

**Note**: For a seemless merge between the recommended config and your own, consider using a package
like `merge-deep`.

#### Pattern
This option allows you to specify where to run the linter on. Several patterns can be specified by
separating them with commas (`,`). You don't need to add extensions though, they will be added
automatically depending on what you choose to lint.
To use this option you can add `--pattern <patterns>` or through the shorthanded notation `-p`.

Example:
- `biotope-quality-gate lint --pattern src,typings,"./*"`

**Note**: When using no wildcards, the application will add them for you (example: `./` will be
interpreted as `./**/*`). When any wildcard is present, the application will assume you know what
you are doing - just don't forget to add quotes on bash commands (`"./*"`) and escaped quotes on
npm scripts (`\"./*\"`).

**Note 2**: `node_modules` folders will always be ignored.

#### Typescript, Javascript, Sass and JSX
These options allow you to specify what should be linted by the application. When no option is
given, the application will assume that it has to lint all logic and style files. If either the
typescript, javascript or sass options are given, the application will only lint these types of
files.
The typescript option will lint files with the `ts` extension, the javascript option will lint files
with the `js` extension, and the sass option will lint files with the extensions `scss` and `css`.
In the case of the JSX option, it will only take effect when at least one of the logic-based options
(typescript and javascript) options are given, or when none of them are - remember, the default
behaviour will lint both of them!
The typescript and javascript options will effectively ignore any files that match the regex
`*.spec.?s`. To lint tests, please see the option "Tests" of this README.
To use these options you can add `--typescript`, `--javascript`, `--sass` and `--include-jsx` or
through their shorthanded notations `-t`, `-j`, `-s` and `-x`, respectively.

Examples:
- `biotope-quality-gate lint` - will lint `ts`, `js`, `scss` and `css` files
- `biotope-quality-gate lint --sass` - will lint `scss` and `css` files
- `biotope-quality-gate lint --typescript` - will only lint `ts` files
- `biotope-quality-gate lint --javascript` - will only lint `js` files
- `biotope-quality-gate lint --include-jsx` - will lint `ts`, `tsx`, `js`, `jsx`, `scss` and `css`
files

#### Fix
This option will try to fix any errors that it finds automatically. If there are errors it finds but
cannot fix them, it will report them as usual.
Typically, this option should not be used on any automated tests.
To use this option you can add `--fix` or through the shorthanded notation `-f`.

Example:
- `biotope-quality-gate lint --fix`

#### Tests
This option will modify the extensions being searched for by adding `.spec` before the selected
options. This option will only affect typescript and javascript files.
To use this option you can add `--spec` or through the shorthanded notation `-e`.

Example:
- `biotope-quality-gate lint --spec` - will lint files with the extensions `scss`, `css`, `.spec.ts`
and `.spec.js`

### Help
This option will print all the above commands and options to the console.
You can use this option within the main application or on any command listed above.
To use this option you can add `--help` or through the shorthanded notation `-h`.

Examples:
- `biotope-quality-gate --help` - will print info on available commands
- `biotope-quality-gate lint --help` - will print info on available options within the `lint`
command

## Troubleshooting

### NPM warnings on dependencies missing
If any dependencies appear to be missing when running the software, you might have installed a
package that is also installing some linting tools with it. In this case, you should use
`npm install --flatten` to quick-fix the issue but don't forget to review your dependencies later.



[link-eslint-config]: https://eslint.org/docs/user-guide/configuring
[link-eslint-disable]: https://eslint.org/docs/user-guide/configuring#disabling-rules-with-inline-comments
[link-stylelint-config]: https://stylelint.io/user-guide/configuration/#the-configuration-object
