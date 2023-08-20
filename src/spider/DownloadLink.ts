import Page from './Page';
import type { DownloadLinkLocator } from './model/Config';

export class DownloadLink {
	protected readonly location: URL;

	constructor(
		location: string | URL,
		protected readonly next?: DownloadLinkLocator,
	) {
		this.location = typeof location === 'string' ? new URL(location) : location;
	}

	async go(): Promise<URL> {
		let { location } = this;
		let config = this.next;
		while (config) {
			const page = new Page(location);
			await page.open();
			const href = page.queryLink(config);
			if (!href) {
				throw new Error(`Failed to find the download link at ${location}`);
			}
			location = new URL(href, location);
			config = config.next;
			page.close();
		}
		return location;
	}
}

export default DownloadLink;
