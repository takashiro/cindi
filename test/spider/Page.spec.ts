import { expect, it, jest } from '@jest/globals';

import fs from 'fs';
import https from 'https';
import http from 'http';

import AbstractPage from '@cindi/spider/Page';

jest.mock('https');
jest.mock('http');

jest.mocked(https.get).mockImplementation((_url, cb): http.ClientRequest => {
	if (typeof cb === 'function') {
		cb({ errored: true } as unknown as http.IncomingMessage);
	}
	return {} as unknown as http.ClientRequest;
});

const httpGet = jest.mocked(http.get).mockImplementation((_url, cb): http.ClientRequest => {
	if (typeof cb === 'function') {
		cb({ errored: true } as unknown as http.IncomingMessage);
	}
	return {} as unknown as http.ClientRequest;
});

class Page extends AbstractPage {
	override async getContent(): Promise<unknown> {
		return this.getLocation();
	}
}

it('fails to open a page', async () => {
	const reader = new Page('https://takashiro.cn');
	expect(reader.isOpen()).toBe(false);
	await expect(() => reader.open()).rejects.toThrowError('Failed to read https://takashiro.cn');
});

it('does not support FTP', async () => {
	const reader = new Page('ftp://takashiro.cn');
	await expect(() => reader.open()).rejects.toThrowError('The protocol ftp: is not supported.');
});

it('opens a page', async () => {
	const reader = new Page('http://takashiro.cn');
	httpGet.mockImplementationOnce((_url, cb) => {
		if (typeof cb === 'function') {
			const message = fs.createReadStream('test/sample/simple.html');
			Reflect.set(message, 'statusCode', 200);
			cb(message as unknown as http.IncomingMessage);
		}
		return {} as unknown as http.ClientRequest;
	});

	expect(() => reader.document).toThrowError('The page is not open.');
	await reader.open();

	const { document } = reader;
	const div = document.querySelector('div');
	expect(div?.textContent).toBe('Catch me if you can.');

	reader.close();
});
