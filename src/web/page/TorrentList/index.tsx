import React from 'react';

import type Torrent from '../../model/Torrent';
import Capsule from '../../common/Capsule';

export default function TorrentList(): JSX.Element {
	const [torrents, setTorrents] = React.useState<Torrent[]>([]);

	async function fetchTorrents(): Promise<void> {
		const res = await window.fetch('/api/v2/torrents/info');
		const torrents = await res.json();
		setTorrents(torrents);
	}

	React.useEffect(() => {
		fetchTorrents();
	}, []);

	return (
		<div>
			{torrents.map((torrent) => (
				<Capsule heading={torrent.name}>
					<td>{torrent.name}</td>
				</Capsule>
			))}
		</div>
	);
}
