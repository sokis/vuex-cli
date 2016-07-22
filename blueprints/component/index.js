var utils = require('../../lib/util/text-helper');

module.exports = {
  description() {
    return '创建组件';
  },
  fileMapTokens() {
    return {
      __style__: (options) => utils.normalizeCasing(options.entity.name, 'dashes')
    };
  }
};