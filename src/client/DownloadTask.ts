import type { DownloadProtocol, DownloadTask as DownloadTaskModel } from '@cindi/model/DownloadTask';
import Entry, { EntryType } from './Entry';

export default class DownloadTask extends Entry {
	protected protocol: DownloadProtocol;

	protected progress: number;

	protected size: number;

	protected location: string;

	constructor(props: DownloadTaskModel) {
		super(EntryType.DownloadTask, props.name);
		this.protocol = props.protocol;
		this.progress = props.progress;
		this.size = props.size;
		this.location = props.location;
	}

	getProtocol(): DownloadProtocol {
		return this.protocol;
	}

	getProgress(): number {
		return this.progress;
	}

	getSize(): number {
		return this.size;
	}

	getLocation(): string {
		return this.location;
	}
}
