require('@babel/register');

const path = require('path');

module.exports = {
  config: path.join(__dirname, './database.js'),
  'migrations-path': path.join(__dirname, '../db/migrations'),
  'seeders-path': path.join(__dirname, '../db/seeders'),
  'models-path': path.join(__dirname, '../src/models'),
};
