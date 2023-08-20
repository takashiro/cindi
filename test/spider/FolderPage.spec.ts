import { expect, it } from '@jest/globals';
import fs from 'fs';

import FolderPage from '@cindi/spider/FolderPage';

const folder = new FolderPage('https://takashiro.cn/folder.html', {
	topics: [
		{
			selector: 'ul.topic > li > a',
			config: {
				title: 'h1',
				downloads: [],
			},
		},
		{
			selector: 'ul.invalid',
			config: {
				title: 'h1',
				downloads: [],
			},
		},
	],
	prev: {
		selector: 'a.prev',
	},
	next: {
		selector: 'a.next',
	},
});

it('opens a folder', async () => {
	await folder.openStream(fs.createReadStream('test/sample/folder.html'));
});

it('finds all the topics', () => {
	const topics = folder.getTopics();
	expect(topics).toHaveLength(3);
	const [a, b, c] = topics;
	expect(a.name).toBe('Topic A');
	expect(a.location?.toString()).toBe('https://takashiro.cn/topic-a');
	expect(b.name).toBe('Topic B');
	expect(b.location?.toString()).toBe('https://takashiro.cn/topic-b');
	expect(c.name).toBe('Topic C');
	expect(c.location).toBeUndefined();
});

it('goes to the next / previous page', () => {
	const prev = folder.getPrev();
	expect(prev?.getLocation().toString()).toBe('https://takashiro.cn/folder-0.html');
	const next = folder.getNext();
	expect(next?.getLocation().toString()).toBe('https://takashiro.cn/folder-2.html');
});
