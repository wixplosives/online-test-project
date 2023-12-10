import { Command } from 'commander';
import * as fs from 'fs';

const program = new Command();

program.command('generate-mock-packages').action(async () => {
    const { extractUrlsFromLockFile } = await import('../mock/generateMock');
    const urls = extractUrlsFromLockFile('package-lock.json');

    for (const url of urls) {
        const parts = url.split('/');
        const fileName = parts.slice(-2, -1);

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

            fs.writeFileSync(`./src/mock/${fileName}.json`, buffer);
            console.log(`Data from ${url} written to ${fileName}`);
        } catch (error) {
            console.error(`Error fetching data from ${url}:`, error);
        }
    }
});

program.parse(process.argv);
