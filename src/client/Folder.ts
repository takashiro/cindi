import Entry, { EntryType } from './Entry';

export default class Folder extends Entry {
	protected entries = new Map<string, Entry>();

	constructor(protected name: string) {
		super(EntryType.Folder, name);
	}

	getEntries(): Entry[] {
		return [...this.entries.values()].sort((a, b) => {
			if (a.getType() !== b.getType()) {
				return a.getType() - b.getType();
			}
			return a.getName().localeCompare(b.getName());
		});
	}

	getEntry(name: string): Entry | undefined {
		return this.entries.get(name);
	}

	addEntry(entry: Entry): void {
		this.entries.set(entry.getName(), entry);
	}

	getFolder(name: string): Folder | undefined {
		const entry = this.getEntry(name);
		if (entry && entry instanceof Folder) {
			return entry;
		}
	}

	trim(): Folder {
		let cur: Folder = this; // eslint-disable-line @typescript-eslint/no-this-alias
		while (cur.entries.size === 1) {
			const [entry] = cur.entries.values();
			if (entry instanceof Folder) {
				cur = entry;
			} else {
				break;
			}
		}
		return cur;
	}

	makeFolder(location: string[]): Folder {
		let cur: Folder = this; // eslint-disable-line @typescript-eslint/no-this-alias
		for (const name of location) {
			const next = cur.getEntry(name);
			if (!next) {
				const folder = new Folder(name);
				cur.addEntry(folder);
				cur = folder;
			} else if (next instanceof Folder) {
				cur = next;
			} else {
				throw new Error(`Failed to create directory: ${name} because it exists as a file.`);
			}
		}
		return cur;
	}
}
