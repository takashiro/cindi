import DownloadLink from './DownloadLink';
import type { CssSelector, DownloadLinkLocator, Topic } from './model/Locator';
import Page from './Page';

export class TopicPage extends Page {
	protected readonly title: CssSelector;

	protected readonly downloads: DownloadLinkLocator[];

	constructor(location: string, options: Topic) {
		super(location);
		this.title = options.title;
		this.downloads = options.downloads;
	}

	getTitle(): string {
		const title = this.querySelector(this.title);
		return title?.textContent ?? '';
	}

	getDownloads(): DownloadLink[] {
		const downloads: DownloadLink[] = [];
		for (const { selector, property = 'href', next } of this.downloads) {
			const links = this.querySelectorAll(selector);
			for (const link of links) {
				const href = link.getAttribute(property);
				if (!href) {
					continue; // eslint-disable-line no-continue
				}
				const downloadUrl = new URL(href, this.location);
				downloads.push(new DownloadLink(downloadUrl, next));
			}
		}
		return downloads;
	}
}

export default TopicPage;
