import chalk from 'chalk';

const schema = {
  properties: {
    sourceBase: {
      description: chalk.blue('源码路径? (相对跟路径)'),
      type: 'string',
      required: true
    },
    testBase: {
      description: chalk.blue('测试代码路径? (相对跟路径)'),
      type: 'string',
      required: true
    },
    dumbPath: {
      description: chalk.blue('业务组件路径？'),
      type: 'string',
      required: true
    },
    fileCasing: {
      description: chalk.blue('文件命名风格？ (default|snake|pascal|camel)'),
      pattern: /(default|snake|pascal|camel|dashes)/,
      required: true,
      type: 'string'
    }
  }
};

export default schema;
