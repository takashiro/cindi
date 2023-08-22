import path from 'path';
import SpiderConfig from '@cindi/spider/model/Config';

const read = require;

export default class Config {
	protected port = 8080;

	protected spiders: SpiderConfig[] = [];

	async read(): Promise<void> {
		const configFile = path.resolve(process.cwd(), 'cindi.config.js');
		const config = read(configFile);
		this.port = config.port;
		this.spiders = config.spiders;
	}

	getPort(): number {
		return this.port;
	}

	getSpiders(): SpiderConfig[] {
		return this.spiders;
	}
}

export const config = new Config();
