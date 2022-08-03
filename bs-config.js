require('dotenv').config();

module.exports = {
  files: ['docs'],
  server: false,
  proxy: process.env.PROXY,
};
