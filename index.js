#!/usr/bin/env node
const program = require('commander');

program
  .name('gig')
  .version(require('./package.json').version);

program
  .command('u')
  .alias('update')
  .option('-p, --proxy <host>', 'using proxy')
  .description('fetch & update cached templates')
  .action(require('./command/update'));

program
  .command('l')
  .alias('list')
  .description('list all available .gitignore template')
  .action(require('./command/list').handler);

program
  .command('g <template>')
  .alias('gen')
  .option('-s, --stdout', 'print to stdout instead of file')
  .option('-n, --noAuto', 'disable automatic template name completion')
  .description('generate .gitignore with specified template')
  .action(require('./command/generate'));

program
  .command('c')
  .alias('clear')
  .description('clear cached templates')
  .action(require('./command/clear'));

program
  .command('p')
  .alias('pack')
  .option('-o, --output <path>', 'output path, default to current cwd directory name')
  .option('-w, --overwrite', 'overwrite existing file at output path')
  .option('-t, --type <type>', 'zip or tar, default to [zip]')
  .option('-s, --show', 'show packed files')
  .description('pack the whole project, repecting .gitignore rules')
  .action(require('./command/pack'));

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

process.on('unhandledRejection', (err, promise) => {
  console.error(err.message);
});
