"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const eslint_1 = require("eslint");
const config_file_1 = require("../config-file");
const getJsxEtensions = (extensions) => extensions.map(ext => `${ext}x`);
const getTestExtensions = (extensions) => extensions.map(ext => `.spec${ext}`);
const getExtensions = (typescript, javascript, includeJsx) => {
    let extensions = [];
    if (typescript) {
        extensions.push('.ts');
    }
    if (javascript) {
        extensions.push('.js');
    }
    if (includeJsx) {
        extensions = extensions.concat(getJsxEtensions(extensions));
    }
    return extensions;
};
const hasAnyLintingSet = ({ javascript, typescript, sass, }) => !!javascript || !!typescript || !!sass;
const setDefaultOptions = (options) => (Object.assign({}, options, { pattern: options.pattern || './', javascript: !hasAnyLintingSet(options) || options.javascript, typescript: !hasAnyLintingSet(options) || options.typescript }));
const report = ({ logic, style }) => {
    const projectPath = path_1.resolve(process.cwd());
    let hasErrors = false;
    if (logic) {
        logic.results.forEach(error => error.messages.forEach((message) => {
            const fileName = error.filePath.replace(projectPath, '.');
            const line = `[${message.line}, ${message.column}]`;
            const rule = `(${message.ruleId})`;
            console.error(`${fileName} ${line}: ${message.message} ${rule}`);
            hasErrors = true;
        }));
    }
    if (style) {
        console.log('SCSS Reporting: Not implemented yet…');
    }
    if (hasErrors) {
        process.exit(1);
    }
};
const lint = (options) => {
    const result = {};
    const { config, pattern, typescript, javascript, includeJsx, sass, fix, spec, } = setDefaultOptions(options);
    const configFile = config_file_1.getConfigFile(config);
    if (typescript || javascript) {
        const extensions = getExtensions(typescript, javascript, includeJsx);
        const testExtensions = getTestExtensions(extensions);
        const patterns = (pattern && pattern.split(',').filter(p => !!p)) || [];
        const baseConfig = Object.assign({}, (includeJsx ? { parserOptions: { ecmaFeatures: { jsx: true } } } : {}), require(configFile));
        result.logic = (new eslint_1.CLIEngine({
            useEslintrc: false,
            baseConfig,
            fix,
            extensions: !spec ? extensions : testExtensions,
            ignorePattern: !spec ? testExtensions.map(ext => `*${ext}`) : undefined,
        })).executeOnFiles(patterns);
    }
    if (sass) {
        console.log('SCSS Linting: Not implemented yet…');
        result.style = {};
    }
    report(result);
};
exports.registerLint = program => program
    .command('lint')
    .option('-c, --config <file>', 'Specify a configuration file (ts or js)')
    .option('-p, --pattern <patterns>', 'Specify patterns to run against (comma separated)')
    .option('-t, --typescript', 'Include typescript files (*.ts)')
    .option('-j, --javascript', 'Include javascript files (*.js)')
    .option('-x, --include-jsx', 'Include jsx files (*.?sx)')
    .option('-s, --sass', 'Include sass files (*.scss)')
    .option('-f, --fix', 'Try to fix any erros found')
    .option('-sp, --spec', 'Specify that the files being linted are tests (*.spec.*)')
    .action(lint);
