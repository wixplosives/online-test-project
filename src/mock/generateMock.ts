import * as fs from 'node:fs';
import * as path from 'node:path';

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

export async function getPackagesWithVersions(): Promise<string[]> {
    const packages: string[] = [];
    const packageFile = await readPackageLock(path.resolve('package.json'));
    // console.log(packageFile);

    for (const field of Object.values(packageFile).filter((field) => field !== 'dependencies')) {
        console.log(field);
    }

    packages.shift(); // remove first package which is the project itself

    fs.writeFileSync('./mock.txt', Array(packages).toString());
    return packages;
}
