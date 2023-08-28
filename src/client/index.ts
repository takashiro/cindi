import mitt from 'mitt';
import DownloadTask from '@cindi/model/DownloadTask';

import Folder from './Folder';

type Events = {
	downloadsChanged: DownloadTask[];
};

export default class Client {
	protected readonly mitt = mitt<Events>();

	readonly on = this.mitt.on;

	readonly off = this.mitt.off;

	protected readonly emit = this.mitt.emit;

	constructor(protected readonly serverUrl = 'api') {
	}

	async getRootFolder(): Promise<Folder> {
		const downloads = await this.getDownloads();
		return new Folder('', downloads).simplify();
	}

	async getDownloads(): Promise<DownloadTask[]> {
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
