import type { DownloadLinkLocator, Folder, Topic } from './Locator';
import PageType from './PageType';

export interface PageConfig {
	/**
	 * Page type. Either `folder` or `topic`.
	 */
	type: PageType;

	/**
	 * URL to the page.
	 */
	location: string;
}

export interface DownloadPageConfig extends PageConfig, DownloadLinkLocator {
	type: PageType.Download;
}

export interface TopicPageConfig extends PageConfig, Topic {
	type: PageType.Topic;
}

export interface FolderPageConfig extends PageConfig, Folder {
	type: PageType.Folder;
}

export type Config = DownloadPageConfig | TopicPageConfig | FolderPageConfig;

export default Config;
