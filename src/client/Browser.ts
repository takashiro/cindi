import mitt from 'mitt';

import type Folder from './Folder';
import type Entry from './Entry';

type Events = {
	navigated: string[];
};

export default class Browser {
	protected readonly mitt = mitt<Events>();

	readonly on = this.mitt.on;

	readonly off = this.mitt.off;

	protected readonly emit = this.mitt.emit;

	protected location: Folder[] = [];

	protected current: Folder;

	constructor(protected readonly root: Folder) {
		this.current = root;
	}

	getLocation(): string[] {
		return this.location.map((folder) => folder.getName());
	}

	getEntries(): Entry[] {
		return this.current.getEntries();
	}

	enter(name: string): boolean {
		const folder = this.current.getFolder(name);
		if (!folder) {
			return false;
		}

		this.location.push(folder);
		this.current = folder;
		this.emit('navigated', this.getLocation());
		return true;
	}

	goBack(): boolean {
		const parent = this.location.pop();
		if (!parent) {
			return false;
		}
		this.current = parent;
		this.emit('navigated', this.getLocation());
		return true;
	}

	goHome(): boolean {
		if (this.location.length <= 0) {
			return false;
		}

		this.current = this.root;
		this.location.splice(0, this.location.length);
		this.emit('navigated', this.getLocation());
		return true;
	}
}
