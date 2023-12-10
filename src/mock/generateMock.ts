import * as fs from 'fs';

interface Dependencies {
    [modulePath: string]: {
        version?: string;
        resolved?: string;
    };
}

export function extractUrlsFromLockFile(lockFilePath: string): string[] {
    const lockFileContent = fs.readFileSync(lockFilePath, 'utf8');
    const dependencies = getDependencies(lockFileContent);

    const apiUrl = 'https://online.codux.com/_api/nnpm-server/v1/nnpm/cjs';

    const urls = Object.entries(dependencies)
        .filter(([modulePath, data]) => data.version !== undefined || data.resolved !== undefined)
        .map(([modulePath, data]) => {
            const [packageName, version] = parseModulePath(modulePath, data.resolved, dependencies);
            return `${apiUrl}${packageName}/${version}.json`;
        });

    return urls;
}

function getDependencies(lockFileContent: string): Dependencies {
    const lockFile = JSON.parse(lockFileContent);
    return lockFile.dependencies || lockFile.packages || {};
}

function parseModulePath(
    modulePath: string,
    resolved?: string,
    dependencies?: Dependencies
): [string, string] {
    const NODE_MODULES = 'node_modules';
    const indexOfNodeModules = modulePath.lastIndexOf(NODE_MODULES);
    const packageName = modulePath.slice(indexOfNodeModules + NODE_MODULES.length);

    if (resolved) {
        const versionMatch = resolved.match(/\/([0-9]+\.[0-9]+\.[0-9]+)/);
        if (versionMatch) {
            return [packageName, versionMatch[1]];
        }
    }

    return [packageName, (dependencies && dependencies[modulePath]?.version) || 'UNKNOWN'];
}
