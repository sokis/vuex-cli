import {
  which,
  rm,
  exec
} from 'shelljs';
import SubCommand from '../models/sub-command';
import CreateAndStepIntoDirectory from '../tasks/create-and-step-into-directory';
import GitPull from '../tasks/git-pull';
import ProjectSettings from '../models/project-settings';

// eventually allow users to create new projects based on a flag
// ie. they can create a new react-redux-starter-kit or a new
// universal react starter kit, etc.

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
      this.ui.writeError('运行该脚本需要你安装Git.');
      this.ui.writeInfo('如果你有安装Homebrew，请试试运行: brew install git');
      process.exit(1);
    }
  }

  // Should maybe prompt user for permission to do this since it's dangerous.
  resetGitHistory() {
    this.ui.writeInfo('移除 Staret Kit项目的 .git 文件夹');
    rm('-rf', '.git');
    exec('git init && git add -A && git commit -m"Initial commit"', {
      silent: true
    });
    this.ui.writeCreate('创建新的 .git 到的项目中');
    this.ui.writeInfo('Congrats! New Redux app ready to go.  CLI generators configured and ready to go');
  }

  // All settings for react-redux-starter-kit live in this template so when
  // new projects get created users can immediately start using the CLI
  createProjectSettings() {
    this.ui.writeInfo('创建默认的.reduxrc文件到项目中');
    const reduxStarterKitTemplate = '../../templates/.starterrc';
    const settings = new ProjectSettings(reduxStarterKitTemplate);
    settings.save();

    this.ui.writeCreate('保存.reduxrc设置.');
  }
}

export default New;
