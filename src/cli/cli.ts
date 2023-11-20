import { Command } from 'commander';

const program = new Command();

program
    .command('generate-mock-packages')
    .option('--out-dir <outDir>')
    .action(async ({ outDir }) => {
        const { getPackagesWithVersions } = await import('../mock/generateMock');
        const data = await getPackagesWithVersions();
    });

program.parse(process.argv);
