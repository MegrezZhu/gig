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
  .action(require('./lib/update'));

program
  .command('l')
  .alias('list')
  .description('list all available .gitignore template')
  .action(require('./lib/list').handler);

program
  .command('g <template>')
  .alias('gen')
  .option('-s, --stdout', 'print to stdout instead of file')
  .option('-n, --noAuto', 'disable automatic template name completion')
  .description('generate .gitignore with specified template')
  .action(require('./lib/generate'));

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

process.on('unhandledRejection', (err, promise) => {
  console.error(err.message);
});
