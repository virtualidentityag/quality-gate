"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const tsConfig = require("../tsconfig.json");
const compile_1 = require("./compile");
const CONFIG_DEFAULT = `${__dirname}/../config/recommended/index.js`;
const resolveConfigFile = (configFile) => {
    if (configFile) {
        if (fs_1.existsSync(path_1.resolve(configFile))) {
            return path_1.resolve(configFile);
        }
        throw new Error(`Cannot find configuration file: "${configFile}"`);
    }
    return path_1.resolve(CONFIG_DEFAULT);
};
const isTsFile = (file) => file.split('.').pop() === 'ts';
exports.getConfigFile = (configFile) => {
    let actualConfigFile = resolveConfigFile(configFile);
    if (isTsFile(actualConfigFile)) {
        compile_1.compile([actualConfigFile], tsConfig);
        actualConfigFile = actualConfigFile.replace('.ts', '.js');
    }
    return actualConfigFile;
};
