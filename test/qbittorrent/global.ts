import { jest } from '@jest/globals';

import Client from '@cindi/qbittorrent/Client';

export const fetch = jest.fn<() => Promise<unknown>>();

export const window = {
	// eslint-disable-next-line global-require
	fetch: process.env.INTEGRATED_SERVER ? require('node-fetch') : fetch,
};

Object.defineProperty(global, 'window', {
	get() { return window; },
});

export const client = new Client(process.env.INTEGRATED_SERVER ?? 'http://localhost:8999', window.fetch);
