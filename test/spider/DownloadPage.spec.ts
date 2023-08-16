import { expect, it } from '@jest/globals';

import fs from 'fs';

import DownloadPage from '@cindi/spider/DownloadPage';

it('finds a hyperlink', async () => {
	const page = new DownloadPage('https://takashiro.cn', {
		selector: 'a',
		property: 'href',
	});
	await page.openStream(fs.createReadStream('test/sample/simple.html'));
	const link = page.getDownloadLink();
	expect(link).toBe('https://werewolf.takashiro.cn');
	page.close();
});

it('fails to find a hyperlink', async () => {
	const page = new DownloadPage('https://takashiro.cn', {
		selector: 'button',
	});
	await page.openStream(fs.createReadStream('test/sample/simple.html'));
	expect(() => page.getDownloadLink()).toThrowError('Failed to find the download link.');
	page.close();
});

it('fails to read property', async () => {
	const page = new DownloadPage('https://takashiro.cn', {
		selector: 'div',
	});
	await page.openStream(fs.createReadStream('test/sample/simple.html'));
	expect(() => page.getDownloadLink()).toThrowError('Failed to find the href property.');
	page.close();
});
