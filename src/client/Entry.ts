import mitt from 'mitt';

export const enum EntryType {
	Unknown,
	Folder,
	DownloadTask,
}

type Events = {
	nameChanged: string;
};

export default class Entry {
	protected readonly mitt = mitt<Events>();

	readonly on = this.mitt.on;

	readonly off = this.mitt.off;

	protected readonly emit = this.mitt.emit;

	constructor(
		protected readonly type: EntryType,
		protected name: string,
	) {
	}

	getType(): EntryType {
		return this.type;
	}

	getName(): string {
		return this.name;
	}
}
