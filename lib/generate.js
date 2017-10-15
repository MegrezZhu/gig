const path = require('path');
const fs = require('fs-extra');
const {getTemplates} = require('./list');
const {templatePath} = require('./constants');

module.exports = async (template, options) => {
  const {noAuto, stdout} = options;
  const list = await getTemplates();

  const selected = match(template, list, !noAuto);
  if (selected.length === 1) {
    // found exactly one result
    const file = fs.createReadStream(path.resolve(templatePath, `${selected[0]}.gitignore`));
    if (stdout) file.pipe(process.stdout);
    else {
      file.pipe(fs.createWriteStream(path.resolve(process.cwd(), '.gitignore')));
    }
  } else {
    console.error(`cannot find specified template`);
    if (selected.length) {
      console.error('do you mean: ');
      console.error(selected);
    }
  }
};

function match (str, candidates, auto) {
  if (auto) {
    return candidates
      .filter(cand => cand.toLowerCase().indexOf(str) === 0);
  } else {
    return candidates.filter(cand => cand.toLowerCase() === str);
  }
}
