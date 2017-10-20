const path = require('path');
const fs = require('fs-extra');
const util = require('util');
const {mv, rm} = require('shelljs');
const {workPath, templatePath, unzipPath, zipPath} = require('../lib/constants');

const ensureDir = util.promisify(fs.ensureDir);

module.exports = async (options) => {
  await ensureDir(workPath);
  await ensureDir(templatePath);
  await ensureDir(unzipPath);

  console.log(`downloading templates...`);
  await download(options);

  console.log(`extracting...`);
  await extract();
  rm(zipPath);

  mv('-f', path.resolve(unzipPath, '*/*.gitignore'), templatePath);
  mv('-f', path.resolve(unzipPath, '*/*/*.gitignore'), templatePath);
  rm('-rf', unzipPath);

  console.log(`done.`);
};

async function download (options) {
  const ax = require('./axios')(options);
  const res = await ax.get('https://github.com/github/gitignore/archive/master.zip', {
    responseType: 'stream'
  });
  return promisifiedPipe(res.data, fs.createWriteStream(zipPath));
}

async function extract () {
  await promisifiedPipe(
    fs.createReadStream(zipPath),
    require('unzip').Extract({ path: unzipPath }));
}

async function promisifiedPipe (streamA, streamB) {
  streamA.pipe(streamB);
  return new Promise((resolve, reject) => {
    streamB.on('close', resolve);
    streamB.on('error', reject);
  });
}
