# biotope-quality-gate

Coding quality and standards enforcer on biotope projects.

This app lints your `.js`, `.ts`, `.css` and `.scss` files according to the `airbnb-base` ruleset
and the recommended linting rules for typescript and sass. It can run on either code files or test
files, ignoring the other automatically. Have a look at the commands and options provided for a
better understanding of what you can do with it.

## Installing
- `npm i -D @biotope/quality-gate`

## Quick run
- `biotope-quality-gate`

which is the same as:
- `biotope-quality-gate --config ./node_modules/@biotope/quality-gate --pattern ./ --test-extension .spec --ext-logic .js,.ts --ext-style .css,.scss`

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

## Options

### Configuration file (`--config`)
By default, the application will try to search for any `.eslintrc` and `.stylelintrc` files in the
root of you project. Since these can also be used for IDE integration, this type of "automatic"
configuration is prefered. If you still want to create a custom config file with javascript or
typescript, this option allows you to do just that. The application includes a set of rules to apply
when none are provided. They are located at `/config/<logic|style>/recommended.js`. You can use them
to extend your `.eslintrc` and `.stylelintrc` files as well - just remember to abide by the `eslint`
and `stylelint` config. For more info, [read this][link-eslint-config] and
[this][link-stylelint-config]).
To use this option you can add `--config <file>` or through the shorthanded notation `-c`.

Example:
- `biotope-quality-gate --config ./my-linting-rules.ts`

**Note**: When using a javascript or typescript config file, for a seemless merge between the
recommended config and your own, consider using a package like `merge-deep`.

**Note 2**: Any configuration file (if written in typescript) will be compiled before executing.

`.eslintrc` file example (no `--config` option needed):
```json
{
  "extends": "./node_modules/@biotope/quality-gate/config/logic/recommended.js"
  // Add any other definition here. Example:
  // "globals": {
  //   "MY_GLOBAL_VARIABLE": true
  //   ...
  // }
}
```

Similarly, the `.stylelintrc` should look like (no `--config` option needed):
```json
{
  "extends": "./node_modules/@biotope/quality-gate/config/style/recommended.js"
  // Add any other definition here. Example:
  // "rules": {
  //   "unit-whitelist": ["em", "rem", "%", "s"]
  //   ...
  // }
}
```

Custom configuration file example (`--config` option should include the path to this file):
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

### Pattern (`--pattern`)
This option allows you to specify where to run the linter on. Several patterns can be specified by
separating them with commas (`,`). You don't need to add extensions though, they will be added
automatically depending on what you choose to lint. By default, the application will have `./` as
the pattern.
To use this option you can add `--pattern <patterns>` or through the shorthanded notation `-p`.

Example:
- `biotope-quality-gate --pattern src,typings,"./*"`

**Note**: When using no wildcards, the application will add them for you (example: `./` will be
interpreted as `./**/*`). When any wildcard is present, the application will assume you know what
you are doing - just don't forget to add quotes on bash commands (`"./*"`) and escaped quotes on
npm scripts (`\"./*\"`).

**Note 2**: `node_modules` folders will always be ignored.

### Tests (`--tests`)
This option will signal the app to look for test files instead of code files. These are determined
by the value set for `--test-extension` (`.spec` by default). This option will only affect logic
files (typescript and javascript), not style files (css and sass).
To use this option you can add `--tests` or through the shorthanded notation `-t`.

Example:
- `biotope-quality-gate --tests` - will lint files with the extensions `scss`, `css`, `.spec.ts`
and `.spec.js`

### Test Extension (`--test-extension`)
The application knows how to distinguish code files and test files. It does so by adding a prefix to
the logic extensions (`.spec` by default). This option allows you to set another value for that
prefix. By default, test files are identified by having `.spec.ts` and `.spec.js` extensions.
To use this option you can add `--test-extension` or through the shorthanded notation `-e`.

Examples:
- `biotope-quality-gate --test-extension .my-spec-prefix` - will ignore files ending on `.my-spec-prefix.js` and `.my-spec-prefix.ts`
- `biotope-quality-gate --tests --test-extension .my-spec-prefix` - will only lint files ending on `.my-spec-prefix.js` and `.my-spec-prefix.ts`

### Extensions (`--ext-logic` and `--ext-style`)
By default the application will try to 1) lint logic files that end with `.js` and `.ts` and 2) lint
style files that end with `.css` and `.scss`. These two options serve as a way to override these
predefined extensions. You can provide them as a comma separated string.
To use these options you can add `--ext-logic` and/or `--ext-style` or through their shorthanded
notations `-l` and `-s`, respectively.

Examples:
- `biotope-quality-gate --ext-logic .js,.jsx` - will lint `js`, `jsx`, `scss` and `css` files
- `biotope-quality-gate --ext-style .sass` - will lint `js`, `ts` and `sass` files

### Skip (`--skip-logic` and `--skip-style`)
This option allows you to tell the application to skip logic or style linting.
To use these options you can add `--skip-logic` or `--skip-style`. No shorthanded commands are
available.

Examples:
- `biotope-quality-gate --skip-logic` - will only lint `scss` and `css` files
- `biotope-quality-gate --skip-style` - will only lint `js`, `ts` files

### Fix (`--fix`)
This option will try to fix any errors that it finds automatically. If there are errors it finds but
cannot fix them, it will report them as usual.
Typically, this option should not be used on any automated tests.
To use this option you can add `--fix` or through the shorthanded notation `-f`.

Example:
- `biotope-quality-gate --fix`

### Help (`--help`)
This option will print all the above options to the console.
To use this option you can add `--help` or through the shorthanded notation `-h`.

Example:
- `biotope-quality-gate --help` - will print info on available options


[link-eslint-config]: https://eslint.org/docs/user-guide/configuring
[link-eslint-disable]: https://eslint.org/docs/user-guide/configuring#disabling-rules-with-inline-comments
[link-stylelint-config]: https://stylelint.io/user-guide/configuration/#the-configuration-object
