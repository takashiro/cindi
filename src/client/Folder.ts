import type DownloadTask from '@cindi/model/DownloadTask';

export default class Folder {
	protected folders = new Map<string, Folder>();

	protected tasks = new Map<string, DownloadTask>();

	constructor(protected name: string, tasks?: DownloadTask[]) {
		if (tasks) {
			this.construct(tasks);
		}
	}

	getName(): string {
		return this.name;
	}

	getFolders(): Folder[] {
		return [...this.folders.values()];
	}

	getFolderNames(): string[] {
		return this.getFolders().map((folder) => folder.getName()).sort((a, b) => a.localeCompare(b));
	}

	getTasks(): DownloadTask[] {
		return [...this.tasks.values()].sort((a, b) => a.name.localeCompare(b.name));
	}

	getTask(name: string): DownloadTask | undefined {
		return this.tasks.get(name);
	}

	addTask(task: DownloadTask): void {
		this.tasks.set(task.name, task);
	}

	getFolder(name: string): Folder | undefined {
		return this.folders.get(name);
	}

	addFolder(folder: Folder): void {
		this.folders.set(folder.getName(), folder);
	}

	construct(tasks: DownloadTask[]): void {
		for (const task of tasks) {
			const location = task.location.split(/[\\/]/);
			const folder = this.makeFolder(location);
			folder.addTask(task);
		}
	}

	simplify(): Folder {
		let cur: Folder = this; // eslint-disable-line @typescript-eslint/no-this-alias
		while (cur.folders.size === 1 && cur.tasks.size === 0) {
			[cur] = cur.folders.values();
		}
		return cur;
	}

	protected makeFolder(location: string[]): Folder {
		let cur: Folder = this; // eslint-disable-line @typescript-eslint/no-this-alias
		for (const name of location) {
			let next = cur.getFolder(name);
			if (!next) {
				next = new Folder(name);
				cur.addFolder(next);
			}
			cur = next;
		}
		return cur;
	}
}
