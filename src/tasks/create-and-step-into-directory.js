import { test, cd, exec } from 'shelljs';
import fs from 'fs';
import denodeify from 'denodeify';

import Task from '../models/task';

const mkdir = denodeify(fs.mkdir);

export default class extends Task {
  constructor(environment) {
    super(environment);
  }

  run(options) {
    this.dirName = options.dirName;
    this.confirmDir();

    this.logger.writeInfo('创建新文件夹中...');
    return mkdir(this.dirName)
      .then(() => {
        cd(this.dirName);
        this.initGit();
        this.logger.writeCreate(`创建完成: ${this.dirName}`);
      });
  }

  confirmDir() {
    if (test('-d', this.dirName)) {
      this.logger.writeError(`${this.dirName} 文件夹以存在!  请换个名字重试`);
      process.exit(1);
    }
  }

  initGit() {
    this.logger.writeInfo('正在初始化 git...');
    exec('git init', {silent: true});
  }
}
