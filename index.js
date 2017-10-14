#!/usr/bin/env node
const program = require('commander');

program
  .version(require('./package.json').version);

program
  .command('l')
  .option('-p, --proxy <host>', 'using proxy')
  .description('list all .gitignore template names')
  .action(require('./lib/list'));

program
  .command('d <template>')
  .description('download specific .gitignore template')
  .option('-p, --proxy <host>', 'using proxy')
  .action(require('./lib/download'));

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
