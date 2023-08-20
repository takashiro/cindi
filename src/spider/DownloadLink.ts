import Page from './Page';
import type { DownloadLinkLocator } from './model/Locator';

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
			const link = page.queryLink(config);
			if (!link) {
				throw new Error(`Failed to find the download link at ${location}`);
			}
			if (!link.location) {
				throw new Error(`Failed to read hyperlink property from the download link at ${location}`);
			}
			location = link.location;
			config = config.next;
			page.close();
		}
		return location;
	}
}

export default DownloadLink;
