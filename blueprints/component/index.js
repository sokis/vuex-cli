import { normalizeCasing } from '../../lib/util/text-helper';

module.exports = {
  description() {
    return '创建组件';
  },
  fileMapTokens() {
    return {
      __style__: (options) => normalizeCasing(options.entity.name,'dashes')
    };
  }
};