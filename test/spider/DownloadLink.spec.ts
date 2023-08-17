import { expect, it, jest } from '@jest/globals';

import fs from 'fs';

import DownloadLink from '@cindi/spider/DownloadLink';
import Page from '@cindi/spider/Page';

const open = jest.spyOn(Page.prototype, 'open').mockImplementation(function fakeOpen(this: Page) {
	return this.openStream(fs.createReadStream('test/sample/simple.html'));
});

const close = jest.spyOn(Page.prototype, 'close');

it('finds a hyperlink', async () => {
	const page = new DownloadLink('https://takashiro.cn', {
		selector: 'a',
		property: 'href',
	});
	const location = await page.go();
	expect(location).toBe('https://werewolf.takashiro.cn/');
	expect(open).toBeCalled();
	expect(close).toBeCalled();
});

it('fails to find a hyperlink', async () => {
	const page = new DownloadLink('https://takashiro.cn', {
		selector: 'button',
	});
	expect(() => page.go()).rejects.toThrowError('Failed to find the download link from https://takashiro.cn.');
});

it('fails to read property', async () => {
	const page = new DownloadLink('https://takashiro.cn', {
		selector: 'div',
	});
	expect(() => page.go()).rejects.toThrowError('Failed to read href property from the link in https://takashiro.cn.');
});
