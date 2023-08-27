export const enum DownloadProtocol {
	Unknown = '',

	/**
	 * Download files via BitTorrent.
	 */
	BitTorrent = 'bittorrent',

	/**
	 * Download files via HTTP or HTTPS.
	 */
	Http = 'http',
}

export interface DownloadTask {
	/**
	 * Protocol.
	 */
	protocol: DownloadProtocol;

	/**
	 * Task name.
	 */
	name: string;

	/**
	 * Download progress in percentage.
	 */
	progress: number;

	/**
	 * Total size (bytes) of all files.
	 */
	size: number;

	/**
	 * Path where this torrent's data is stored.
	 */
	location: string;
}

export default DownloadTask;
