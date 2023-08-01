import { AddTorrentOptions } from './model/torrents/add';
import Torrent from './model/Torrent';
import TorrentFilterOptions from './model/TorrentFilterOptions';

import { StatusCode } from './network/Http';
import HttpClient from './network/HttpClient';
import HttpError from './network/HttpError';
import * as HttpRequest from './network/HttpRequest';

export default class Client extends HttpClient {
	async getTorrents(options?: TorrentFilterOptions): Promise<Torrent[]> {
		const query = HttpRequest.createQuery(
			options,
			HttpRequest.transformArray('hashes', '|'),
		);
		const res = await this.get('/api/v2/torrents/info', { query });
		if (res.status !== StatusCode.Ok) {
			throw new HttpError(res.status, await res.text());
		}
		return res.json();
	}

	async addTorrent(options: AddTorrentOptions): Promise<void> {
		const form = HttpRequest.createFormData(
			options,
			HttpRequest.transformArray('torrents'),
			HttpRequest.transformArray('urls', '\r\n'),
			HttpRequest.transformArray('tags', ','),
		);

		const res = await this.post('/api/v2/torrents/add', { body: form });
		if (res.status !== StatusCode.Ok) {
			throw new HttpError(res.status, await res.text());
		}
		return res.json();
	}
}
