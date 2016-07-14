import Task from '../models/task';
import denodeify from 'denodeify';

const exec = denodeify(require('child_process').exec);

export default class extends Task {
  constructor(environment) {
    super(environment);
  }

  run(gitUrl) {
    const logger = this.logger;
    logger.startProgress(`正在从Github获取 ${gitUrl}.`);

    return exec(`git pull ${gitUrl}`, {silent: true}).then((err, stdout, stderr) => {
      logger.stopProgress();

      if (err) {
        logger.writeError('出了些问题... 请重试.  请检查你的网络连接是否正常');
        logger.writeError(`错误代码: ${err}`);
        logger.writeError(stdout);
        logger.writeError(stderr);
        process.exit(1);
      }
      logger.writeInfo('pulled down repo');
      Promise.resolve();
    });
  }
}
