# biotope-quality-gate

## WARNING: This is a WIP repo for coding quality and standards on biotope

## Installing on your project
- `npm i @biotope/quality-gate`

## Quick run
- `biotope-quality-gate lint`
which is the same as:
- `biotope-quality-gate lint --typescript --javascript --config-file ./node_modules/@biotope/quality-gate --pattern ./`

## Commands

### Lint

Options are:
  - -c, --config <file>       Specify a configuration file (ts or js)
  - -p, --pattern <patterns>  Specify patterns to run against (comma separated)
  - -t, --typescript          Include typescript files (*.ts)
  - -j, --javascript          Include javascript files (*.js)
  - -x, --include-jsx         Include jsx files (*.?sx)
  - -s, --sass                Include sass files (*.scss)
  - -f, --fix                 Try to fix any erros found
  - -sp, --spec               Specify that the files being linted are tests (*.spec.*)
  - -h, --help                output usage information

## WARNING
If any dependencies appear to be missing when running the software, you should use `npm install --flatten`.
In this case, you might have installed a package that is also installing some linting tools with it.
