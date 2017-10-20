const {rm} = require('shelljs');
const {workPath} = require('../lib/constants');

module.exports = async () => {
  rm('-rf', workPath);
};
