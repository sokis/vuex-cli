import commander from 'commander';
import { version } from '../version';
import Compile from '../sub-commands/compile';

const subCommand = new Compile();

commander.on('--help', () => {
	subCommand.printUserHelp();
});

commander
	.version(version())
	.description('  编译代码')
	.parse(process.argv);


subCommand.run();
