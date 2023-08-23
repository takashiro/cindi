import type Hyperlink from './model/Hyperlink';
import type { DownloadLinkLocator } from './model/Locator';

import Page from './Page';

export class DownloadPage extends Page {
	constructor(
		location: string | URL,
		protected readonly config: DownloadLinkLocator,
	) {
		super(location);
		this.location = typeof location === 'string' ? new URL(location) : location;
	}

	override async getContent(): Promise<Hyperlink> {
		let link = this.getDownloadLink();
		let config = this.config.next;
		while (config) {
			const next = new DownloadPage(link.location, config);
			await next.open();
			link = next.getDownloadLink();
			next.close();
			config = config.next;
		}
		return link;
	}

	getDownloadLink(): Required<Hyperlink> {
		const link = this.queryLink(this.config);
		if (!link) {
			throw new Error(`Failed to find the download link at ${this.location}`);
		}

		const { location } = link;
		if (!location) {
			throw new Error(`Failed to read property of the download link at ${this.location}`);
		}

		return {
			name: link.name,
			location,
		};
	}
}

export default DownloadPage;
