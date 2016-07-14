import prompt from 'prompt';
import figlet from 'figlet';

import SubCommand from '../models/sub-command';

import initPrompt from '../prompts/initPrompt';
import { setupPrompt } from '../prompts/setup';
import { success } from '../util/text-helper';

class Init extends SubCommand {
	constructor() {
		super();
		setupPrompt('initialization', prompt);
	}

	printUserHelp() {
		this.logger.write(
			'初始化命令用于在.vuexrc中设置项目配置'
		);
	}

	run() {
		this.logger.write(this.cliLogo());
		prompt.get(initPrompt, (err, result) => {
			
			if (err) return;

			this.logger.writeInfo('正在保存你的设置');
			this.settings.setAllSettings(result);
			this.settings.save();
			this.logger.writeCreate('.vuexrc 已保存在项目根目录.');
		});
	}

	cliLogo() {
		return success(
			figlet.textSync('Vuex-CLI', {
				font: 'Doom',
				horizontalLayout: 'default',
				verticalLayout: 'default'
			})
		);
	}
}

export default Init;
