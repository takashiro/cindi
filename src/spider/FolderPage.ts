import type { FolderPageConfig, LinkLocator, TopicPageLocator } from './model/Config';
import type Hyperlink from './model/Hyperlink';
import Page from './Page';

export class FolderPage extends Page {
	protected topics: TopicPageLocator[];

	protected prev?: LinkLocator;

	protected next?: LinkLocator;

	constructor(location: string | URL, options: FolderPageConfig) {
		super(location);

		this.topics = options.topics;
		this.prev = options.prev;
		this.next = options.next;
	}

	getTopics(): Hyperlink[] {
		return this.topics
			.map((topic) => this.queryLinks(topic))
			.reduce((prev, cur) => prev.concat(cur), []);
	}

	getPrev(): FolderPage | undefined {
		return this.prev && this.getPage(this.prev);
	}

	getNext(): FolderPage | undefined {
		return this.next && this.getPage(this.next);
	}

	protected getPage(target: LinkLocator): FolderPage | undefined {
		const link = this.queryLink(target);
		const location = link?.location;
		return location && new FolderPage(location, this.getOptions());
	}

	protected getOptions(): FolderPageConfig {
		return {
			topics: this.topics,
			prev: this.prev,
			next: this.next,
		};
	}
}

export default FolderPage;
