import type { CssSelector, DownloadFinder } from './model/Finder';
import Page from './Page';

export class DownloadPage extends Page {
	protected readonly selector: CssSelector;

	protected readonly property: string;

	constructor(location: string, options: DownloadFinder) {
		super(location);
		this.selector = options.selector;
		this.property = options.property ?? 'href';
	}

	getDownloadLink(): string {
		const link = this.document.querySelector(this.selector);
		if (!link) {
			throw new Error('Failed to find the download link.');
		}
		const href = link.getAttribute(this.property);
		if (href === null) {
			throw new Error(`Failed to find the ${this.property} property.`);
		}
		return href;
	}
}

export default DownloadPage;
