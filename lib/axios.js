const axios = require('axios');
const HttpsProxyAgent = require('https-proxy-agent');
const HttpProxyAgent = require('http-proxy-agent');

module.exports = options => {
  return axios.create({
    httpAgent: options.proxy && new HttpProxyAgent(options.proxy),
    httpsAgent: options.proxy && new HttpsProxyAgent(options.proxy),
    baseURL: 'https://api.github.com',
    timeout: 3000
  });
};
