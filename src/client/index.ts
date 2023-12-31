import mitt from 'mitt';
import type DownloadTaskModel from '@cindi/model/DownloadTask';
import type { Config as SpiderConfig } from '@cindi/spider';

import Folder from './Folder';
import DownloadTask from './DownloadTask';
import Browser from './Browser';

type Events = {
	ready: boolean;
};

export default class Client {
	protected readonly mitt = mitt<Events>();

	readonly on = this.mitt.on;

	readonly off = this.mitt.off;

	protected readonly emit = this.mitt.emit;

	constructor(protected readonly serverUrl = 'api') {
	}

	async crawl(config: SpiderConfig): Promise<unknown> {
		const res = await this.fetch('spider', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(config),
		});
		const content = await res.json();
		return content;
	}

	async getBrowser(): Promise<Browser> {
		const downloads = await this.getDownloads();
		const root = new Folder('');
		for (const task of downloads) {
			const location = task.location.split(/[\\/]/);
			const folder = root.makeFolder(location);
			folder.addEntry(new DownloadTask(task));
		}
		return new Browser(root.trim());
	}

	async getDownloads(): Promise<DownloadTaskModel[]> {
		const res = await this.fetch('downloads');
		const downloads = await res.json();
		return downloads;
	}

	protected fetch(input: string, init?: RequestInit): Promise<Response> {
		return window.fetch(`${this.serverUrl}/${input}`, init);
	}
}

let client: Client | undefined;

export function useClient(): Client {
	if (!client) {
		client = new Client();
	}
	return client;
}
