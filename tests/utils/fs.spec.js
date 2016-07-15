import { fileExists, readFile } from 'util/fs';
import fse from 'fs-extra';
import fs from 'fs';
import path from 'path';

describe('(Utils) fs', () => {
	describe('#fileExists', () => {
		it('returns true when file exists', () => {
			const finalPath = path.join(process.cwd(), 'tmp/example.js');
			fse.outputFileSync(finalPath, 'path');

			expect(fileExists(finalPath)).to.be.true;
			fse.removeSync(finalPath);
		});

		it('returns false when file doesnt exist', () => {
			expect(fileExists('tmp/some/random/path')).to.be.false;
		});

		it('throws error when not file present error', () => {
			const error = {
				message: 'random error',
				code: 'random code'
			};
			sinon.stub(fs, 'accessSync').throws(error);

			try {
				fileExists('tmp/example.js');
			} catch (e) {
				expect(e.code).to.eql('random code');
			}
		});
	});
});
