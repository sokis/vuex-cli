import commander from 'commander';
import { version } from '../version';

const program = commander;

program
  .version(version());

program
  .command('init', '初始化配置文件 .vuexrc');

program
  .command('new', '创建一个新的 vuex 项目');

// fake an alias for generate since commander doesn't support
// aliases for sub-commands.
program
  // .command('generate', '')
  .command('g', '基于Blueprints模板创建结构');

program.on('--help', () => {
  console.log('  Examples:');
  console.log('');
  console.log('    $ vuex init --help');
  console.log('    $ vuex new my-vuex-project');
  console.log('    $ vuex g component MyComponent');
  console.log('');
});

program.parse(process.argv);
