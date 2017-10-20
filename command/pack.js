const walker = require('walker');
const ignore = require('ignore');
const path = require('path');
const fs = require('fs-extra');
const archiver = require('archiver');
const assert = require('assert');

const CWD = process.cwd();
const availableTypes = ['zip', 'tar'];

module.exports = async options => {
  const overwrite = !!options.overwrite;
  const type = options.type || 'zip';
  const dest = path.resolve(CWD, options.output || `${path.basename(CWD)}.${type}`);
  assert(availableTypes.indexOf(type) !== -1, 'invalid type');
  if (!overwrite) await checkOverwrite(dest);

  const ignoreRule = await getIgnoreRule();
  const files = await getFiles(CWD, ignoreRule.rules, ignoreRule.path);
  await packZip(files, path.resolve(CWD, dest), {type});

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

async function getFiles (root, ignoreRules, ignoreRulesRoot) {
  const ig = ignore().add([...ignoreRules, '.git']);
  const res = [];
  return new Promise(resolve => {
    walker(root)
      .on('file', entry => {
        res.push(entry);
      })
      .on('end', () => {
        const filter = ig.createFilter();
        resolve(
          res.filter(p => filter(path.relative(ignoreRulesRoot, p)))
        );
      });
  });
}

async function getIgnoreRule (filename = '.gitignore') {
  let _path = CWD;
  while (true) {
    const toTest = path.join(_path, filename);
    if (await fs.pathExists(toTest)) {
      const data = await fs.readFile(toTest, {
        encoding: 'utf-8'
      });
      return {
        path: _path,
        rules: processIgnoreFile(data)
      };
    }
    if (isRoot(_path)) break;
    _path = path.join(_path, '..');
  }
  return {
    path: '/',
    rules: []
  };
}

function processIgnoreFile (data, root) {
  return data.split(/\r?\n/)
    .filter(s => !!s)
    .filter(s => !s.match(/^\W*#/));
}

function isRoot (_path) {
  return path.join(_path, '..') === _path;
}
