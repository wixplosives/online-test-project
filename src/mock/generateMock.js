"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractUrlsFromLockFile = void 0;
var fs = require("fs");
function extractUrlsFromLockFile(lockFilePath) {
    var lockFileContent = fs.readFileSync(lockFilePath, 'utf8');
    var dependencies = getDependencies(lockFileContent);
    var apiUrl = 'https://online.codux.com/_api/nnpm-server/v1/nnpm/cjs/';
    var urls = Object.entries(dependencies)
        .filter(function (_a) {
        var modulePath = _a[0], data = _a[1];
        return data.version !== undefined || data.resolved !== undefined;
    })
        .map(function (_a) {
        var modulePath = _a[0], data = _a[1];
        var _b = parseModulePath(modulePath, data.resolved, dependencies), packageName = _b[0], version = _b[1];
        return "".concat(apiUrl).concat(packageName, "/").concat(version, ".json");
    });
    return urls;
}
exports.extractUrlsFromLockFile = extractUrlsFromLockFile;
function getDependencies(lockFileContent) {
    var lockFile = JSON.parse(lockFileContent);
    return lockFile.dependencies || lockFile.packages || {};
}
function parseModulePath(modulePath, resolved, dependencies) {
    var _a;
    var NODE_MODULES = 'node_modules';
    var indexOfNodeModules = modulePath.lastIndexOf(NODE_MODULES);
    var packageName = modulePath.slice(indexOfNodeModules + NODE_MODULES.length);
    if (resolved) {
        var versionMatch = resolved.match(/\/([0-9]+\.[0-9]+\.[0-9]+)/);
        if (versionMatch) {
            return [packageName, versionMatch[1]];
        }
    }
    return [packageName, (dependencies && ((_a = dependencies[modulePath]) === null || _a === void 0 ? void 0 : _a.version)) || 'UNKNOWN'];
}
