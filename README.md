# biotope-quality-gate

Coding quality and standards enforcer on biotope projects.

This app lints your `.js`, `.ts`, `.css` and `.scss` files according to the `airbnb-base` ruleset
and the recommended linting rules for typescript and sass. It can run on either code files or test
files, ignoring the other automatically. Have a look at the options provided for a better
understanding of what you can do with it.

Note that this application uses `browserslist` to check both logic and style in order to disallow
features that aren't supported by your target browsers. Either add a `.browserslistrc` file to your
project or configure your `package.json` file (see [this][link-browserslist-config] for more info).

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
on your custom config file or to extend your `.eslintrc` and `.stylelintrc` files. Remember to abide
by the `eslint` and `stylelint` configs. For more info, [read this][link-eslint-config] and
[this][link-stylelint-config].
To use this option you can add `--config <file>` or through the shorthanded notation `-c`.

Example:
- `biotope-quality-gate --config ./my-linting-rules.ts`

**Note**: When using a javascript or typescript config file, for a seemless merge between the
recommended config and your own, consider using a package like `merge-deep`.

**Note 2**: Any configuration file (if written in typescript) will be compiled before executing.

`.eslintrc` file example (no `--config` option needed):
```js
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
```js
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
This option will try to fix any errors that it finds automatically before reporting. If there are
any unfixable errors, it will report them as usual. Typically, this option should not be used on any
automated tests.
To use this option you can add `--fix` or through the shorthanded notation `-f`.

Example:
- `biotope-quality-gate --fix`

### Ignore Warnings (`--ignore-warnings`)
By default, all warnings are treated as errors and will make the process fail. By using this option
you can disable this behaviour and allow warnings to pass. If there are warnings when using this
option, they will be reported as usual.
To use this option you can add `--ignore-warnings` or through the shorthanded notation `-w`.

Example:
- `biotope-quality-gate --ignore-warnings`

### Help (`--help`)
This option will print all the above options to the console.
To use this option you can add `--help` or through the shorthanded notation `-h`.

Example:
- `biotope-quality-gate --help` - will print info on available options

## IDE Integration

### VSCode
- Install `@biotope/quality-gate` on your project as a dev dependency
- Create an `.eslintrc` file and a `.stylelintrc` file on the root of your project
  - Hint: You can copy the examples from the `--config` section of this Readme (under **Note 2**)
- Install the `eslint` and `stylelint-plus` plugins
  - `settings.json` extra configs:
  ```json
    // Add eslint files/languages that you want to lint
    "eslint.validate": [
      "javascript",
      "javascriptreact",
      "typescript",
      "typescriptreact"
    ],
    // Autofix section
    "editor.codeActionsOnSave": { "source.fixAll.eslint": true },
    "stylelint.autoFixOnSave": true
  ```
  - Note that you can remove the autofix lines if that's something you don't fancy

## Contributing
PRs are very much welcome! We encourage you to fork the project and implement your own feature or
fix that nasty bug that's bugging eveyone. You can just create a PR afterwards. If you just don't
have the time, we also welcome everyone to create issues with feature requests or bugs, just be sure
that your request/bug is within the scope of this project.

## Known Issues

### Style browser support false positives
The plugin `stylelint-no-unsupported-browser-features` used in this package uses a `doiuse` version
that looks for errors in all left-hand strings, regardless of them being variables or css
properties (example 1) and regardless of them fully matching the css property (example 2).

#### Examples
Example 1:
```scss
// Assume that: project browsers do not support css property "columns"

// False positive on variable name ("grid-columns")
$grid-columns: 12;

.my-div {
  // Correct error on css property ("columns")
  columns: $grid-columns;
}
```
Example 2:
```scss
// Assume that: project browsers do not support css property "transform2d"
.my-div {
  // False positive due to left-hand containing the string "transform"
  text-transform: none;
}
```
GitHub issues/PR links:
- https://github.com/anandthakker/doiuse/issues/82
- https://github.com/ismay/stylelint-no-unsupported-browser-features/issues/45
- https://github.com/anandthakker/doiuse/issues/100
- https://github.com/anandthakker/doiuse/issues/106
- https://github.com/anandthakker/doiuse/pull/101

#### Advice

Until this is fixed, surround your variables with disable/enable and disable each false positive:
```scss
// stylelint-disable plugin/no-unsupported-browser-features
$grid-columns: 12;
$grid-columns-width: 60px;
// stylelint-enable plugin/no-unsupported-browser-features

.my-div {
  columns: $grid-columns;
  // stylelint-disable-next-line plugin/no-unsupported-browser-features
  text-transform: none;
}
```


[link-browserslist-config]: https://github.com/browserslist/browserslist#browserslist-
[link-eslint-config]: https://eslint.org/docs/user-guide/configuring
[link-eslint-disable]: https://eslint.org/docs/user-guide/configuring#disabling-rules-with-inline-comments
[link-stylelint-config]: https://stylelint.io/user-guide/configuration/#the-configuration-object
