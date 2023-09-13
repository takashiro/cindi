export type CssSelector = string;

type Locator<T> = T & {
	/**
	 * A CSS selector to locate the download link on this page.
	 */
	selector: CssSelector;
};

export interface Link {
	/**
	 * Link property on the download link. (Default: `href`)
	 */
	property?: string;
}

export type LinkLocator = Locator<Link>;

export interface DownloadLink extends Link {
	/**
	 * If the link is just a page,
	 * define this element to find the actual download link.
	 */
	next?: Locator<DownloadLink>;
}

export type DownloadLinkLocator = Locator<DownloadLink>;

export interface Topic {
	/**
	 *A CSS selector to find the title.
	 */
	title: CssSelector;

	/**
	 * A CSS selector to find download links on this page.
	 */
	downloads: LinkLocator[];
}

export interface TopicLinkLocator extends LinkLocator {
	config: Topic;
}

export interface Folder {
	/**
	 * CSS selectors to find topics on this page.
	 */
	topics: LinkLocator[];

	/**
	 * A link to go to the previous page.
	 */
	prev?: LinkLocator;

	/**
	 * A link to go to the next page.
	 */
	next?: LinkLocator;
}

export interface FolderLinkLocator extends LinkLocator {
	config: Folder;
}
