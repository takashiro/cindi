export const enum StateFilter {
	All = 'all',
	Downloading = 'downloading',
	Seeding = 'seeding',
	Completed = 'completed',
	Paused = 'paused',
	Active = 'active',
	Inactive = 'inactive',
	Resumed = 'resumed',
	Stalled = 'stalled',
	StalledUploading = 'stalled_uploading',
	StalledDownloading = 'stalled_downloading',
	Errored = 'errored',
}

export interface TorrentFilterOptions {
	[name: string]: unknown;

	/**
	 * Filter torrent list by state.
	 */
	filter?: StateFilter;

	/**
	 * Get torrents with the given category.
	 *
	 * 		- empty string means "without category".
	 * 		- no "category" parameter means "any category".
	 */
	category?: string;

	/**
	 * Get torrents with the given tag
	 *
	 * 		- empty string means "without tag".
	 * 		- no "tag" parameter means "any tag".
	 * @since qBittorrent 2.8.3
	 */
	tag?: string;

	/**
	 * Sort torrents by given key.
	 * They can be sorted using any field of the response's JSON array
	 * (which are documented below) as the sort key.
	 */
	sort?: string;

	/**
	 * Enable reverse sorting. Defaults to false
	 */
	reverse?: boolean;

	/**
	 * Limit the number of torrents returned.
	 */
	limit?: number;

	/**
	 * Set offset (if less than 0, offset from end)
	 */
	offset?: string;

	/**
	 * Filter by hashes.
	 */
	hashes?: string[];
}

export default TorrentFilterOptions;
