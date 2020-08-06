# biotope-quality-gate

Coding quality and standards for biotope projects built on Stencil.

This package gives you default configurations for biotope projects for `eslint` and `stylelint`,
which will enable you to lint `.js`, `.jsx`, `.ts`, `.tsx`, `.css` and `.scss` files by simply
extending the configurations provided.

This package includes the necessary tools and plugins as dependencies for both configurations to run
without a hassle, but it will require you to run both `eslint` and `stylelint` on your projects.

## Installing
- `npm i -D @biotope/quality-gate`

## Using the recommended configs

### Logic
Create an `.eslintrc` file and extend the default recommended config like so:
```js
{
  "extends": "./node_modules/@biotope/quality-gate/config/.eslintrc.js"
  // Add any other definition here. Example:
  // "globals": {
  //   "MY_GLOBAL_VARIABLE": true
  //   ...
  // }
}
```

Run `eslint` in a script like so:
```js
{
  "scripts": {
    // ...
    "lint:code": "eslint \"./**/*.js\" \"./**/*.ts\""
  }
}
```

Since you're running `eslint` natively, check out their documentation on how to run or extend it [here][link-eslint-disable].

### Style
Create an `.stylelintrc` file and extend the default recommended config like so:
```js
{
  "extends": "./node_modules/@biotope/quality-gate/config/.stylelintrc.js"
  // Add any other definition here. Example:
  // "rules": {
  //   "unit-whitelist": ["em", "rem", "%", "s"]
  //   ...
  // }
}
```

Run `stylelint` in a script like so:
```js
{
  "scripts": {
    // ...
    "lint:style": "stylelint \"./**/*.css\" \"./**/*.scss\""
  }
}
```

Since you're running `stylelint` natively, check out their documentation on how to run or extend it [here][link-stylelint-disable].

### Browser support
Create an `.browserslistrc` file and extend the default recommended config like so:
```js
extends ./node_modules/@biotope/quality-gate/config/.browserslistrc
# Add any other definition here. Example:
# not ie 11
```

Important: To make extends working, you have to start your linter which uses browserslist with dangerousExtend: true. For eslint and stylelint is this already preconfigured. More information [here][link-browserslist-extend].

## IDEs
To take advantage of the linters' strengths and to ensure no problems during merges, please consider installing the following plugins on your IDE.

If your IDE is not present on this list, please help us by making a PR to include proper plugins for it and ensure everyone shares this knowledge.

Hint: "on-save" linting can be a big help to save development time.

### VSCode
- dbaeumer.vscode-eslint
- hex-ci.stylelint-plus


[link-browserslist-config]: https://github.com/browserslist/browserslist#browserslist-
[link-eslint-config]: https://eslint.org/docs/user-guide/configuring
[link-stylelint-config]: https://stylelint.io/user-guide/configuration/#the-configuration-object
[link-browserslist-extend]: https://github.com/browserslist/browserslist#shareable-configs
