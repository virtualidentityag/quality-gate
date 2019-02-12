# biotope-quality-gate

## WARNING: This is a WIP repo for coding quality and standards on biotope

## Installing on your project
- `npm i @biotope/quality-gate`

## Running on your project
- `biotope-quality-gate lint`
which is the same as:
- `biotope-quality-gate lint --typescript --javascript --config-file ./node_modules/@biotope/quality-gate --pattern ./`

For more information, please run `biotope-quality-gate lint --help`.

## WARNING
If any dependencies appear to be missing when running the software, you should use `npm install --flatten`.
In this case, you might have installed a package that is also installing some linting tools with it.
