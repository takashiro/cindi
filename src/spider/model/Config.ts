export type CssSelector = string;

type ElementLocator<T> = T & {
	/**
	 * A CSS selector to locate the download link on this page.
	 */
	selector: CssSelector;
};

export interface LinkConfig {
	/**
	 * Link property on the download link. (Default: `href`)
	 */
	property?: string;
}

export type LinkLocator = ElementLocator<LinkConfig>;

export interface DownloadLinkConfig extends LinkConfig {
	/**
	 * If the link is just a page,
	 * define this element to find the actual download link.
	 */
	next?: ElementLocator<DownloadLinkConfig>;
}

export type DownloadLinkLocator = ElementLocator<DownloadLinkConfig>;

export interface TopicPageConfig {
	/**
	 *A CSS selector to find the title.
	 */
	title: CssSelector;

	/**
	 * A CSS selector to find download links on this page.
	 */
	downloads: DownloadLinkLocator[];
}

export interface TopicPageLocator extends LinkLocator {
	config: TopicPageConfig;
}

export interface FolderPageConfig {
	/**
	 * CSS selectors to find topics on this page.
	 */
	topics: TopicPageLocator[];

	/**
	 * A link to go to the previous page.
	 */
	prev?: LinkLocator;

	/**
	 * A link to go to the next page.
	 */
	next?: LinkLocator;
}

export interface FolderPageLocator extends LinkLocator {
	config: FolderPageConfig;
}
