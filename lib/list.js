module.exports = async (options) => {
  const ax = require('./axios')(options);
  const {data} = await ax.get('/repos/github/gitignore/contents');
  const list = data.filter(o => o.name.match(/\.gitignore$/)).map(o => o.name.replace('.gitignore', ''));
  console.log(list.reduce((str, e) => str + e + '\t', ''));
};
