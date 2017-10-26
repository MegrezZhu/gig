const path = require('path');
const fs = require('fs-extra');
const assert = require('assert');
const {exec} = require('shelljs');

const CWD = process.cwd();
const availableTypes = ['zip', 'tar'];

module.exports = async options => {
  const overwrite = !!options.overwrite;
  const type = options.type || 'zip';
  const prefix = options.prefix ? `--prefix ${options.prefix}` : '';
  const dest = path.resolve(CWD, options.output || `${path.basename(CWD)}.${type}`);

  assert(availableTypes.indexOf(type) !== -1, 'invalid type');
  if (!overwrite) await checkOverwrite(dest);

  pack({
    root: CWD,
    dest,
    prefix,
    type
  });

  console.log(`--> ${dest}`);
};

async function checkOverwrite (file) {
  assert(!await fs.pathExists(file), `${file} already exists, packing aborted`);
}

function pack ({root, dest, prefix, type}) {
  let res = exec(`git archive --format ${type} -o ${dest} ${prefix} HEAD`, {silent: true, cwd: root});
  if (res.stderr) throw new Error(res.stderr);
}
