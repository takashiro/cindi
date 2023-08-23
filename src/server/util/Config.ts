import path from 'path';

const read = require;

export default class Config {
	protected port = 8586;

	async read(): Promise<void> {
		const configFile = path.resolve(process.cwd(), 'cindi.config.js');
		try {
			const config = read(configFile);
			this.port = config.port;
		} catch (error) {
			// ignore
		}
	}

	getPort(): number {
		return this.port;
	}
}

export const config = new Config();
