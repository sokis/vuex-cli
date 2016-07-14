
import ejs from 'ejs';
import fs from 'fs';
import { outputFileSync } from 'fs-extra';
import { fileExists } from '../util/fs';

class FileInfo {
	constructor(args) {
		this.logger = args.logger;
		this.templateVariables = args.templateVariables; // locals passed to ejs template
		this.originalPath = args.originalPath;           // path to template
		this.mappedPath = args.mappedPath;               // destination path to be written to
	}

	writeFile() {
		this.logger.writeDebug(`试图写入文件: ${this.mappedPath}`);
		if (fileExists(this.mappedPath)) {
			this.logger.writeError(
				`无法写入文件.  文件已经存在: ${this.mappedPath}`
			);
		} else {
			const fileContent = this.renderTemplate();
			this.logger.writeDebug(`文件内容: ${fileContent}`);

			//写文件
			outputFileSync(this.mappedPath, fileContent);
			this.logger.writeCreate(this.mappedPath);
		}
		return;
	}

	renderTemplate() {
		let rendered;
		this.logger.writeDebug(`渲染模板: ${this.originalPath}`);
		const template = fs.readFileSync(this.originalPath, 'utf8');

		try {
			rendered = ejs.render(template, this.templateVariables);
		} catch (err) {
			this.logger.writeDebug('渲染失败');
			err.message += ' (Error in blueprint template: ' + this.originalPath + ')';
			this.logger.writeError(`error was: ${err.message}`);
			throw err;
		}
		return rendered;
	}

	isFile() {
		let fileCheck;
		try {
			fileCheck = fs.lstatSync(this.originalPath).isFile();
		} catch (e) {
			if (e.code === 'ENOENT') {
				return false;
			} else {
				throw e;
			}
		}
		this.logger.writeDebug(`文件校验: ${this.originalPath} - ${fileCheck}`);
		return fileCheck;
	}
}

export default FileInfo;
