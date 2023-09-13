import type { Folder as FolderPageOptions, LinkLocator } from './model/Locator';
import type Hyperlink from './model/Hyperlink';
import type Folder from './model/Folder';
import Page from './Page';

export class FolderPage extends Page {
	protected topics: LinkLocator[];

	protected prev?: LinkLocator;

	protected next?: LinkLocator;

	constructor(location: string | URL, options: FolderPageOptions) {
		super(location);

		this.topics = options.topics;
		this.prev = options.prev;
		this.next = options.next;
	}

	override async getContent(): Promise<Folder> {
		return {
			topics: this.getTopics(),
			prev: this.getPrev(),
			next: this.getNext(),
		};
	}

	getTopics(): Hyperlink[] {
		return this.topics
			.map((topic) => this.queryLinks(topic))
			.reduce((prev, cur) => prev.concat(cur), []);
	}

	getPrev(): Hyperlink | undefined {
		return this.prev && this.queryLink(this.prev);
	}

	getNext(): Hyperlink | undefined {
		return this.next && this.queryLink(this.next);
	}
}

export default FolderPage;
