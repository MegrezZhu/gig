const url = 'https://raw.githubusercontent.com/github/gitignore/master/';
const path = require('path');
const fs = require('fs-extra');

module.exports = async (template, options) => {
  const ax = require('./axios')(options);
  console.log(`downloading from ${url}${template}.gitignore`);
  try {
    const res = await ax.get(url + template + '.gitignore', {
      responseType: 'stream'
    });
    res.data.pipe(fs.createWriteStream(path.resolve(process.cwd(), '.gitignore')));
    await new Promise((resolve, reject) => {
      res.data.on('end', resolve);
      res.data.on('error', reject);
    });
    console.log('-->', path.resolve(process.cwd(), '.gitignore'));
  } catch (err) {
    if (err.response && err.response.status === 404) {
      console.error(`template ${template} not found`);
      console.error(`Note: Template name is case-sensitive`);
    } else {
      throw err;
    }
  }
};
