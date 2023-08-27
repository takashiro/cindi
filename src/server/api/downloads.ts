import { Router } from 'express';
import { Client } from '@cindi/qbittorrent';
import DownloadTask, { DownloadProtocol } from '@cindi/model/DownloadTask';

const router = Router();
const client = new Client('http://192.168.10.15:8787', fetch);

router.get('/', async (req, res) => {
	const torrents = await client.getTorrents();
	const downloads: DownloadTask[] = torrents.map((torrent) => ({
		protocol: DownloadProtocol.BitTorrent,
		hash: torrent.hash,
		name: torrent.name,
		progress: torrent.progress,
		size: torrent.size,
		location: torrent.save_path,
	}));
	res.json(downloads);
});

export default router;
