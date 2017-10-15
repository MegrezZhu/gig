const os = require('os');
const path = require('path');

const workPath = path.resolve(os.tmpdir(), 'gig');
const zipPath = path.resolve(workPath, 'gitignore.zip');
const unzipPath = path.resolve(workPath, 'gitignore');
const templatePath = path.resolve(workPath, 'templates');

module.exports = {
  workPath, zipPath, unzipPath, templatePath
};
