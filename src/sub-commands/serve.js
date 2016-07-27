import SubCommand from '../models/sub-command';
import WebServer from '../tasks/webpack-server';

// 开发服务器
class Serve extends SubCommand {
	constructor() {
		super();
		this.webserver = new WebServer(this.environment);
	}

	printUserHelp() {
		this.logger.write(
			'  vuex server --help '
		);
	}

	run(cliArg) {
		this.webserver.run(cliArg);
	}
}

export default Serve;
