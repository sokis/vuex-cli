import commander from 'commander';
import { version } from '../version';
import Serve from '../sub-commands/serve';
// import minimist from 'minimist';

const subCommand = new Serve();

commander.on('--help', () => {
	subCommand.printUserHelp();
});

commander
	.version(version())
	.description('  启动开发服务器')
	.parse(process.argv);


subCommand.run();
