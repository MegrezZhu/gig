const walker = require('walker');
const path = require('path');
const fs = require('fs-extra');
const archiver = require('archiver');
const assert = require('assert');
const {exec} = require('shelljs');

const CWD = process.cwd();
const availableTypes = ['zip', 'tar'];

module.exports = async options => {
  const overwrite = !!options.overwrite;
  const show = !!options.show;
  const type = options.type || 'zip';
  const dest = path.resolve(CWD, options.output || `${path.basename(CWD)}.${type}`);
  assert(availableTypes.indexOf(type) !== -1, 'invalid type');
  if (!overwrite) await checkOverwrite(dest);

  const files = await getFiles(CWD);
  const filteredFiles = files.filter(getIgnoreRulesFilter(CWD))

  await packZip(filteredFiles, path.resolve(CWD, dest), {type});

  if (show) {
    files.forEach(p => {
      console.log(`packed: ${path.relative(CWD, p)}`);
    });
  }
  console.log(`--> ${dest}`);
};

async function checkOverwrite (file) {
  assert(!await fs.pathExists(file), `${file} already exists, packing aborted`);
}

async function packZip (files, dest, {type}) {
  const archive = archiver(type, {
    zlib: {level: 9}
  });
  const destStream = fs.createWriteStream(dest);

  files.forEach(file => {
    archive.append(fs.createReadStream(file), {name: path.relative(CWD, file)});
  });

  archive.finalize();

  return new Promise((resolve, reject) => {
    archive.pipe(destStream);
    destStream.on('close', resolve);
    destStream.on('error', reject);
  });
}

async function getFiles (root) {
  const res = [];
  return new Promise(resolve => {
    walker(root)
      .on('file', entry => {
        res.push(entry);
      })
      .on('end', () => {
        resolve(
          res.map(p => path.relative(root, p).replace(/\\/g, '/'))
        );
      });
  });
}

function getIgnoreRulesFilter (root) {
  const option = { silent: true, cwd: root, async: false };
  let mock = false;

  const status = exec('git status', option);
  if (status.code !== 0) {
    if (status.stderr.match(/Not a git repository/)) mock = true;
    else throw new Error(status.stderr);
  }

  if (mock) exec('git init', option);
  const res = exec('git ls-files -oi --exclude-standard', option);
  if (mock) exec('rm -rf .git', option);

  const set = new Set(res.split('\n'));
  return p => !set.has(p) && !p.startsWith('.git/');
}
