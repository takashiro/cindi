import { expect, it, jest } from '@jest/globals';
import fs from 'fs';

import type Page from '@cindi/spider/Page';
import DownloadPage from '@cindi/spider/DownloadPage';

const open = jest.spyOn(DownloadPage.prototype, 'open').mockImplementation(function fakeOpen(this: Page) {
	return this.openStream(fs.createReadStream('test/sample/simple.html'));
});

jest.spyOn(DownloadPage.prototype, 'close').mockReturnValue();

it('finds a hyperlink', async () => {
	const page = new DownloadPage(new URL('https://takashiro.cn'), {
		selector: 'a',
		property: 'href',
	});
	await page.open();
	const link = await page.getContent();
	expect(link.location?.toString()).toBe('https://werewolf.takashiro.cn/');
	expect(open).toBeCalled();
	page.close();
});

it('fails to find the hyperlink', async () => {
	const page = new DownloadPage('https://takashiro.cn', {
		selector: 'button',
	});
	await page.open();
	await expect(page.getContent()).rejects.toThrowError('Failed to find the download link at https://takashiro.cn/');
	page.close();
});

it('fails to read the hyperlink property', async () => {
	const page = new DownloadPage('https://takashiro.cn', {
		selector: 'a',
		property: 'href',
		next: {
			selector: 'a',
			property: 'href',
			next: {
				selector: 'a.invalid',
			},
		},
	});
	await page.open();
	await expect(page.getContent()).rejects.toThrowError('Failed to read property of the download link at https://werewolf.takashiro.cn/');
	page.close();
});
