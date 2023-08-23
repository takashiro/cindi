import type { CssSelector, DownloadLinkLocator, Topic as TopicPageOptions } from './model/Locator';
import type Hyperlink from './model/Hyperlink';
import type Topic from './model/Topic';

import Page from './Page';

export class TopicPage extends Page {
	protected readonly title: CssSelector;

	protected readonly downloads: DownloadLinkLocator[];

	constructor(location: string, options: TopicPageOptions) {
		super(location);
		this.title = options.title;
		this.downloads = options.downloads;
	}

	override async getContent(): Promise<Topic> {
		return {
			title: this.getTitle(),
			downloads: this.getDownloads(),
		};
	}

	getTitle(): string {
		const title = this.querySelector(this.title);
		return title?.textContent ?? '';
	}

	getDownloads(): Hyperlink[] {
		return this.downloads
			.map((locator) => this.queryLinks(locator))
			.reduce((prev, cur) => prev.concat(cur), []);
	}
}

export default TopicPage;
