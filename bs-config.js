require('dotenv').config();

module.exports = {
  files: ['docs'],
  server: false,
  proxy: 'http://127.0.0.1:4000/',
};
