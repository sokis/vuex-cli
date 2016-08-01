import SubCommand from '../models/sub-command';
import CompileTask from '../tasks/webpack-compile';

// 开发服务器
class Compile extends SubCommand {
	constructor() {
		super();
		this.compile = new CompileTask(this.environment);
	}

	printUserHelp() {
		this.logger.write(
			'  vuex compile --help '
		);
	}

	run(cliArg) {
		this.compile.run(cliArg);
	}
}

export default Compile;
