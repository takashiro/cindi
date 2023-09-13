import { expect, it } from '@jest/globals';
import fs from 'fs';

import FolderPage from '@cindi/spider/FolderPage';

const folder = new FolderPage('https://takashiro.cn/folder.html', {
	topics: [
		{
			selector: 'ul.topic > li > a',
		},
		{
			selector: 'ul.invalid',
			property: 'alt',
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
	expect(topics).toHaveLength(2);
	const [a, b] = topics;
	expect(a.name).toBe('Topic A');
	expect(a.location?.toString()).toBe('https://takashiro.cn/topic-a');
	expect(b.name).toBe('Topic B');
	expect(b.location?.toString()).toBe('https://takashiro.cn/topic-b');
});

it('goes to the next / previous page', () => {
	const prev = folder.getPrev();
	expect(prev?.location?.toString()).toBe('https://takashiro.cn/folder-0.html');
	const next = folder.getNext();
	expect(next?.location?.toString()).toBe('https://takashiro.cn/folder-2.html');
});
