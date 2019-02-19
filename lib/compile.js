"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = require("typescript");
exports.compile = (fileNames, options) => {
    const program = typescript_1.createProgram(fileNames, options);
    const exitCode = program.emit().emitSkipped ? 1 : 0;
    if (exitCode) {
        process.exit(exitCode);
        console.log(`Process exiting with code '${exitCode}'.`);
    }
};
