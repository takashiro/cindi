import path from 'path';

const read = require;

export default class Config {
	protected port = 8586;

	protected bittorrentUrl = 'http://localhost:8989';

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

	getBittorrentUrl(): string {
		return this.bittorrentUrl;
	}
}

export const config = new Config();
