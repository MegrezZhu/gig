const fs = require('fs-extra');
const util = require('util');
const {templatePath} = require('./constants');
const {table} = require('table');
const _ = require('lodash');

exports.handler = async (options) => {
  const tableWidth = 3;
  const res = await exports.getTemplates();
  if (res.length % tableWidth !== 0) {
    res.push(..._.fill(Array(tableWidth - (res.length % tableWidth)), ''));
  }
  console.log(table(_.chunk(res, tableWidth)));
};

exports.getTemplates = async function () {
  const res = await util.promisify(fs.readdir)(templatePath);
  return res.map(name => name.replace('.gitignore', ''));
}
