import Page from './Page';
import type { DownloadLinkSelector } from './model/Config';

export class DownloadLink {
	protected readonly location: URL;

	constructor(
		location: string | URL,
		protected readonly next?: DownloadLinkSelector,
	) {
		this.location = typeof location === 'string' ? new URL(location) : location;
	}

	async go(): Promise<URL> {
		let { location } = this;
		let config = this.next;
		while (config) {
			const page = new Page(location);
			await page.open();
			const a = page.querySelector(config.selector);
			if (!a) {
				throw new Error(`Failed to find the download link from ${location}`);
			}
			const { property = 'href' } = config;
			const href = a.getAttribute(property);
			if (!href) {
				throw new Error(`Failed to read ${property} property from the link in ${location}`);
			}
			location = new URL(href, location);
			config = config.next;
			page.close();
		}
		return location;
	}
}

export default DownloadLink;
