import commander from 'commander';
import { version } from '../version';
import Generate from '../sub-commands/generate';
import minimist from 'minimist';

const subCommand = new Generate();

commander.on('--help', () => {
	subCommand.printUserHelp();
});

commander
	.version(version())
	.arguments('<blueprint> [entity name]')
	.option('-d, --debugger', '开启调试模式')
	.description('基于Blueprints 模板 生成代码')
	.action((blueprintName, entityName, command) => {
		const debug = command.debugger;
		const rawArgs = command.rawArgs;
		const options = minimist(rawArgs.slice(2));

		const cliArgs = {
			entity: {
				name: entityName,
				options,
				rawArgs
			},
			debug
		};
		subCommand.run(blueprintName, cliArgs);
	})
	.parse(process.argv);
