/**
 * 任务基类
 */
class Task {
  constructor(environment) {
    this.logger = environment.logger;
    this.settings = environment.settings;
  }

  run() {
    throw new Error('任务必须实现 run()');
  }
}

export default Task;
