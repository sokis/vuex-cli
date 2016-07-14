import ProjectSettings from './project-settings';
import Logger from './logger';

/**
 * 子命令基类
 */
class SubCommand {
  constructor(options = {}) {
    this.rawOptions = options;
    this.settings = options.settings || new ProjectSettings();
    this.logger = options.logger || new Logger();

    this.environment = {
      logger: this.logger,
      settings: this.settings
    };
  }

  run() {
    throw new Error('子命令必须实现 run()');
  }

  availableOptions() {
    throw new Error('子命令必须实现 availableOptions()');
  }
}

export default SubCommand;
