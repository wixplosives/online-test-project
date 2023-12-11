import { Command } from 'commander';
import * as fs from 'fs';
import { execSync } from 'child_process';

const program = new Command();

program.command('generate-mock-files').action(async () => {
    const { extractUrlsFromLockFile } = await import('../mock/generateMock');
    const urls = extractUrlsFromLockFile('package-lock.json');
    const MOCK_FILES_PATH = './src/mock/files';

    execSync(`rm -rf ${MOCK_FILES_PATH}/*`);

    for (const url of urls) {
        const fileName = url.slice(url.indexOf('cjs') + 4).replaceAll('/', '-');

        try {
            const response = await fetch(url);
            if (!response.ok) {
                console.error(`Failed to fetch data from ${url}`);
                continue;
            }

            const reader = response.body!.getReader();
            const chunks: Uint8Array[] = [];

            while (true) {
                const { done, value } = await reader!.read();

                if (done) {
                    break;
                }

                chunks.push(value);
            }

            const buffer = Buffer.concat(chunks);

            fs.writeFileSync(`${MOCK_FILES_PATH}/${fileName}.json`, buffer);
            console.log(`Data from ${url} written to ${fileName}`);
        } catch (error) {
            console.error(`Error fetching data from ${url}:`, error);
        }
    }
});

program.parse(process.argv);
