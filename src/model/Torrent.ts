import DownloadTask, { DownloadProtocol } from './DownloadTask';

export interface Torrent extends DownloadTask {
	protocol: DownloadProtocol.BitTorrent;

	/**
	 * Torrent hash.
	 */
	hash: string;
}

export default Torrent;
