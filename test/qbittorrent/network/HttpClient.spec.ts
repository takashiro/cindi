import { URLSearchParams } from 'url';
import {
	jest,
	describe,
	it,
	beforeEach,
	expect,
} from '@jest/globals';

import HttpClient, { FetchApi } from '@cindi/qbittorrent/network/HttpClient';

const fetch = jest.fn<FetchApi>().mockResolvedValue({ status: 200 } as unknown as Response);

beforeEach(() => {
	fetch.mockClear();
});

describe('Create a request', () => {
	const client = new HttpClient('http://localhost:8080/api', fetch);

	it('GET /api/status', async () => {
		const res = await client.get('/status');
		expect(res.status).toBe(200);
		expect(fetch).toBeCalledWith('http://localhost:8080/api/status', {
			method: 'GET',
			headers: {
				accept: 'application/json',
			},
		});
	});

	it('POST /api/torrents', async () => {
		const body = JSON.stringify({ a: 1 });
		const res = await client.post('/torrents', {
			headers: {
				accept: '*',
			},
			query: new URLSearchParams({
				type: 'none',
			}),
			body,
		});
		expect(res.status).toBe(200);
		expect(fetch).toBeCalledWith('http://localhost:8080/api/torrents?type=none', {
			method: 'POST',
			headers: {
				accept: '*',
			},
			body,
		});
	});
});
