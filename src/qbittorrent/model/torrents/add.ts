interface BasicAddOptions {
	/**
	 * Where to save torrent contents.
	 */
	savepath?: string;

	/**
	 * Cookie sent to download the .torrent file.
	 */
	cookie?: string;

	/**
	 * Category for the torrents
	 */
	category?: string;

	/**
	 * Tags for the torrents
	 */
	tags?: string[];

	/**
	 * Whether to skip hash checking.
	 */
	skip_checking?: boolean;

	/**
	 * Whether to add torrents in the paused state.
	 */
	paused?: boolean;

	/**
	 * Whether to create the root folder.
	 */
	root_folder?: boolean;

	/**
	 * Rename torrent.
	 */
	rename?: string;

	/**
	 * Set torrent upload speed limit. Unit in bytes/second.
	 */
	upLimit?: number;

	/**
	 * Set torrent download speed limit. Unit in bytes/second.
	 */
	dlLimit?: number;

	/**
	 * Set torrent share ratio limit
	 * @since v2.8.1
	 */
	ratioLimit?: number;

	/**
	 * Set torrent seeding time limit. Unit in seconds.
	 * @since v2.8.1
	 */
	seedingTimeLimit?: number;

	/**
	 * Whether Automatic Torrent Management should be used.
	 */
	autoTMM?: boolean;

	/**
	 * Enable sequential download. Possible values are true, false (default)
	 */
	sequentialDownload?: boolean;

	/**
	 * Prioritize download first last piece. Possible values are true, false (default)
	 */
	firstLastPiecePrio?: boolean;
}

export interface AddTorrentUrlOptions extends BasicAddOptions {
	/**
	 * URLs to download torrent files.
	 */
	urls: string[];
}

export interface AddTorrentFileOptions extends BasicAddOptions {
	/**
	 * Torrent files.
	 */
	torrents: Blob[];
}

export interface AddTorrentOptions extends AddTorrentFileOptions, AddTorrentUrlOptions {
	[name: string]: unknown;
}

export type RequestBody = AddTorrentOptions;

export const enum ResponseCode {
	InvalidTorrent = 415,
	Ok = 200,
}
