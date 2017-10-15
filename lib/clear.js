const {rm} = require('shelljs');
const {workPath} = require('./constants');

module.exports = async () => {
  rm('-rf', workPath);
};
