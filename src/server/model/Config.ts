export interface Config {
	/**
	 * Define a server port. (Default: `8586`)
	 */
	port?: number;

	/**
	 * Define the URL of a BitTorrent client (Default: `http://localhost:8989`).
	 *
	 * Currently only qBittorrent is supported.
	 */
	bittorrentUrl?: string;
}

export default Config;
