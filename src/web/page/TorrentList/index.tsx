import React from 'react';

import type Torrent from '../../model/Torrent';

export default function TorrentList(): JSX.Element {
	const [torrents, setTorrents] = React.useState<Torrent[]>([]);

	async function fetchTorrents(): Promise<void> {
		const res = await window.fetch('/api/v2/torrents/info');
		const torrents = await res.json();
		setTorrents(torrents);
	}

	React.useEffect(() => {
		fetchTorrents();
	});

	return (
		<table>
			<thead>
				<tr>
					<td>Name</td>
					<td>Size</td>
					<td>Done</td>
				</tr>
			</thead>
			<tbody>
				{torrents.map((torrent) => (
					<tr>
						<td>{torrent.name}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
