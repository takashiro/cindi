import { it, expect } from '@jest/globals';
import fs from 'fs';

import RssReader from '@cindi/vigilia/RssReader';
import FeedItem from '@cindi/vigilia/model/FeedItem';

it('should reads a link', async () => {
	const input = fs.createReadStream('test/sample/one-item.xml');
	const reader = new RssReader(input);
	const feeds: FeedItem[] = [];
	reader.on('feed', (feed) => {
		feeds.push(feed);
	});
	reader.once('end', () => {
		expect(feeds).toHaveLength(1);
		expect(feeds[0]).toStrictEqual({
			title: 'Title',
			description: 'Lorum Ipsam',
			link: 'https://example.com/Home/Episode/0b4a866c9f3cc40577db30cfc8e6909c8dd33666',
		});
	});
	await reader.exec();
});

it('should reads two torrents', async () => {
	const input = fs.createReadStream('test/sample/two-torrents.xml');
	const reader = new RssReader(input);

	reader.setTimezone({ hour: 8 });
	expect(reader.parseDate('2022-05-11T20:25:24.011')).toStrictEqual(new Date('2022-05-11T12:25:24.011Z'));

	const feeds: FeedItem[] = [];
	reader.on('feed', (feed) => {
		feeds.push(feed);
	});
	reader.once('end', () => {
		expect(feeds).toHaveLength(2);
		expect(feeds[0]).toStrictEqual({
			title: 'タイトル',
			description: 'Lorum Ipsum',
			link: 'https://example.com/page1/test-a',
			torrent: {
				contentLength: 599072448,
				link: 'https://example.com/Home/Episode/99aa94b13a4f276ea27add3a013c1b6c737b727b',
				pubDate: new Date('2022-05-10T18:25:24.011Z'),
			},
		});
		expect(feeds[1]).toStrictEqual({
			title: 'Title',
			description: 'Lorum Ipsam',
			link: 'https://example.com/Home/Episode/0b4a866c9f3cc40577db30cfc8e6909c8dd33666',
		});
	});
	await reader.exec();
});
