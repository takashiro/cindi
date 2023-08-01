import {
	it,
	expect,
} from '@jest/globals';

import {
	fetch,
	client,
} from './global';

import * as torrentInfo from './mock/torrents/info';

it('gets a list of torrents', async () => {
	fetch.mockResolvedValue({
		status: torrentInfo.status,
		json: () => Promise.resolve(torrentInfo.body),
	});
	const torrents = await client.getTorrents();
	expect(torrents).toHaveLength(2);
});
