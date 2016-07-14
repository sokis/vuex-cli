import {
  which,
  rm,
  exec
} from 'shelljs';
import SubCommand from '../models/sub-command';
import CreateAndStepIntoDirectory from '../tasks/create-and-step-into-directory';
import GitPull from '../tasks/git-pull';
import ProjectSettings from '../models/project-settings';

class New extends SubCommand {
  constructor() {
    super();
    this.createDirTask = new CreateAndStepIntoDirectory(this.environment);
    this.gitPullTask = new GitPull(this.environment);
  }

  printUserHelp() {
    this.logger.write('命令用于创建一个新的vuex项目');
  }

  run(cliArgs) {
    this.confirmGit();
    this.createDirTask.run(cliArgs).then(() => {
      let  fetch_url = 'https://github.com/sokis/vue-vuex-starter-kit.git';

      this.gitPullTask.run(fetch_url).then(() => {
        this.createProjectSettings();
        this.resetGitHistory();
      });
    });
  }

  confirmGit() {
    if (!which('git')) {
      this.logger.writeError('运行该脚本需要你安装Git.');
      this.logger.writeInfo('如果你有安装Homebrew，请试试运行: brew install git');
      process.exit(1);
    }
  }

  // Should maybe prompt user for permission to do this since it's dangerous.
  resetGitHistory() {
    this.logger.writeInfo('移除 Staret Kit项目的 .git 文件夹');
    rm('-rf', '.git');
    exec('git init && git add -A && git commit -m"Initial commit"', {
      silent: true
    });
    this.logger.writeCreate('创建新的 .git 到的项目中');
    this.logger.writeInfo('恭喜！新的vuex项目已经创建成功。接下来你可以配置CLI并继续使用它');
  }

  // 创建.vuexrc到新的vuex项目中。
  createProjectSettings() {
    this.logger.writeInfo('创建默认的.vuexrc文件到项目中');
    const vuexStarterKitTemplate = '../../templates/.starterrc';
    const settings = new ProjectSettings(vuexStarterKitTemplate);
    settings.save();

    this.logger.writeCreate('保存.vuexrc设置.');
  }
}

export default New;
