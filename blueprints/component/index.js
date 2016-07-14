import { normalizeCasing } from '../../src/util/text-helper';

module.exports = {
  description() {
    return 'Generates a dumb (aka Pure) component';
  },
  fileMapTokens() {
    return {
      __style__: (options) => normalizeCasing(options.entity.name,'dashes')
    };
  }
};