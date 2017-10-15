#!/usr/bin/env node
const program = require('commander');

program
  .name('gig')
  .version(require('./package.json').version);

program
  .command('u')
  .option('-p, --proxy <host>', 'using proxy')
  .description('fetch & update cached templates')
  .action(require('./lib/update'));

program
  .command('l')
  .description('list all .gitignore template names')
  .action(require('./lib/list').handler);

program
  .command('g <template>')
  .option('-s, --stdout', 'print to stdout instead of file')
  .description('generate .gitignore with specified template')
  .action(require('./lib/generate'));

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

process.on('unhandledRejection', (err, promise) => {
  console.error(err.message);
});
