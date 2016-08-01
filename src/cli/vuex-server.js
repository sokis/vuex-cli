import commander from 'commander';
import { version } from '../version';
import Server from '../sub-commands/server';
// import minimist from 'minimist';

const subCommand = new Server();

commander.on('--help', () => {
	subCommand.printUserHelp();
});

commander
	.version(version())
	.description('  启动开发服务器')
	.parse(process.argv);


subCommand.run();
