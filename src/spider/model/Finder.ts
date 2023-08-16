export type CssSelector = string;

export interface DownloadFinder {
	/**
	 * A CSS selector to find the download link on this page.
	 */
	selector: CssSelector;

	/**
	 * Link property on the download link. (Default: `href`)
	 */
	property?: string;
}
