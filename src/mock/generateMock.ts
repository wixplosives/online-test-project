import * as fs from 'node:fs';
import * as path from 'path';

function readPackageLock(filePath: string): Promise<any> {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                try {
                    const lockFile = JSON.parse(data);
                    resolve(lockFile);
                } catch (jsonErr) {
                    reject(jsonErr);
                }
            }
        });
    });
}

function getPackagesWithVersions(lockFile: any): Record<string, string> {
    const packages: Record<string, string> = {};

    function processDependencies(dependencies: any) {
        for (const [packageName, packageInfo] of Object.entries(dependencies)) {
            packages[packageName] = packageInfo.version;
            if (packageInfo.dependencies) {
                processDependencies(packageInfo.dependencies);
            }
        }
    }

    processDependencies(lockFile.dependencies);

    return packages;
}

async function main() {
    const lockFilePath = path.resolve(__dirname, 'path/to/your/package-lock.json');

    try {
        const lockFile = await readPackageLock(lockFilePath);
        const packagesWithVersions = getPackagesWithVersions(lockFile);

        console.log('Packages and their versions:');
        for (const [packageName, version] of Object.entries(packagesWithVersions)) {
            console.log(`${packageName}: ${version}`);
        }
    } catch (err) {
        console.error('Error reading or parsing package-lock.json:', err);
    }
}

main();
