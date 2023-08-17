import { expect, it } from '@jest/globals';
import fs from 'fs';

import TopicPage from '@cindi/spider/TopicPage';

it('selects download links', async () => {
	const page = new TopicPage('https://takashiro.cn', {
		title: 'div',
		downloads: [
			{
				selector: 'a',
			},
			{
				selector: 'div',
			},
		],
	});
	await page.openStream(fs.createReadStream('test/sample/simple.html'));
	expect(page.getTitle()).toBe('Catch me if you can.');
	const downloads = page.getDownloads();
	expect(downloads).toHaveLength(1);
	const link = await downloads[0].go();
	expect(link.toString()).toBe('https://werewolf.takashiro.cn/');
	page.close();
});

it('finds no title', async () => {
	const page = new TopicPage('https://takashiro.cn', {
		title: '.non-existing',
		downloads: [],
	});
	await page.openStream(fs.createReadStream('test/sample/simple.html'));
	expect(page.getTitle()).toBe('');
	page.close();
});
