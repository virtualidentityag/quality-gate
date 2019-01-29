"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const eslint_1 = require("eslint");
const packageJson = require("../../package.json");
const projectPath = path_1.resolve(process.cwd());
const selfPath = path_1.resolve(`${projectPath}/node_modules/${packageJson.name}`);
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
const report = ({ logic, style }) => {
    if (logic) {
        logic.results.forEach(error => error.messages.forEach((message) => {
            const fileName = error.filePath.replace(projectPath, '.');
            const line = `[${message.line}, ${message.column}]`;
            const rule = `(${message.ruleId})`;
            console.error(`${fileName} ${line}: ${message.message} ${rule}`);
        }));
    }
    if (style) {
        console.error('SCSS Reporting: Not implemented yet…');
    }
};
const lint = (options) => {
    const result = {};
    if (options.typescript || options.javascript) {
        const extensions = getExtensions(options.typescript, options.javascript, options.includeJsx);
        const testExtensions = getTestExtensions(extensions);
        const patterns = (options.pattern && options.pattern.split(',').filter(p => !!p)) || [];
        const baseConfig = Object.assign({ extends: `${selfPath}/.eslintrc.base.json`, env: { browser: true } }, (options.includeJsx ? { parserOptions: { ecmaFeatures: { jsx: true } } } : {}));
        result.logic = (new eslint_1.CLIEngine(Object.assign({}, (!options.configFile ? { baseConfig } : {
            configFile: options.configFile,
        }), { fix: !!options.fix, extensions: !options.spec ? extensions : testExtensions, ignorePattern: !options.spec ? testExtensions.map(ext => `*${ext}`) : undefined }))).executeOnFiles(patterns);
    }
    if (options.sass) {
        console.error('SCSS Linting: Not implemented yet…');
        result.style = {};
    }
    report(result);
};
exports.registerLint = program => program
    .command('lint')
    .option('-c, --config-file <file>', 'Specify a configuration file')
    .option('-p, --pattern <patterns>', 'Specify patterns to run against (comma separated)')
    .option('-t, --typescript', 'Include typescript files (*.ts)')
    .option('-j, --javascript', 'Include javascript files (*.js)')
    .option('-x, --include-jsx', 'Include jsx files (*.?sx)')
    .option('-s, --sass', 'Include sass files (*.scss)')
    .option('-f, --fix', 'Try to fix any erros found')
    .option('-sp, --spec', 'Specify that the files being linted are tests (*.spec.*)')
    .action(lint);
