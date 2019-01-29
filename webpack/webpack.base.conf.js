const dirs = require('./base/dirs');
const { entries } = require('./base/pages');
const modules = require('./base/module');

module.exports = {
  context: dirs.src,

  entry: entries,

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '~': dirs.src
    }
  },

  module: modules
};