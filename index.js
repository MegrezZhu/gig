#!/usr/bin/env node
const program = require('commander');

program
  .version(require('./package.json').version)
  .option('-p, --proxy <host>', 'using proxy');

program.parse(process.argv);
