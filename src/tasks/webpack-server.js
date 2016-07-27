import Task from '../models/task';
import config from '../config';
import { serve } from 'vuex-cli-webpack'

export default class extends Task {
	constructor(environment) {
		super(environment);
	}

	run(config) {
		const logger = this.logger;
		logger.writeInfo('正在启动开发服务器...')
		serve()
	}
}
