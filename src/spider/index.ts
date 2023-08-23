import type Config from './model/Config';
import PageType from './model/PageType';

import Page from './Page';
import TopicPage from './TopicPage';
import FolderPage from './FolderPage';
import DownloadPage from './DownloadPage';

export class Spider {
	constructor(protected config: Config) {}

	getPage(): Page {
		const { type, location } = this.config;
		if (type === PageType.Folder) {
			return new FolderPage(location, this.config);
		}
		if (type === PageType.Topic) {
			return new TopicPage(location, this.config);
		}
		if (type === PageType.Download) {
			return new DownloadPage(location, this.config);
		}
		throw new Error(`Unknown page type: ${type}`);
	}
}

export default Spider;
