export type CssSelector = string;

type ElementSelector<T> = T & {
	/**
	 * A CSS selector to find the download link on this page.
	 */
	selector: CssSelector;
};

export interface LinkStructure {
	/**
	 * Link property on the download link. (Default: `href`)
	 */
	property?: string;
}

export interface DownloadLinkStructure extends LinkStructure {
	/**
	 * If the link is just a page,
	 * define this element to find the actual download link.
	 */
	next?: DownloadLinkSelector;
}

export type DownloadLinkSelector = ElementSelector<DownloadLinkStructure>;

export interface TopicPageStructure {
	/**
	 *A CSS selector to find the title.
	 */
	title: CssSelector;

	/**
	 * A CSS selector to find download links on this page.
	 */
	downloads: DownloadLinkSelector[];
}

export type TopicPageSelector = ElementSelector<TopicPageStructure>;

export interface FolderPageStructure {
	/**
	 * CSS selectors to find topics on this page.
	 */
	topics: TopicPageSelector[];

	/**
	 * A link to go to the previous page.
	 */
	prev?: LinkStructure;

	/**
	 * A link to go to the next page.
	 */
	next?: LinkStructure;
}

export type FolderPageSelector = ElementSelector<FolderPageStructure>;
