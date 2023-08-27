import React from 'react';
import type DownloadTask from '@cindi/model/DownloadTask';

import Capsule from '../../common/Capsule';

import './index.scss';

export default function DownloadList(): JSX.Element {
	const [downloads, setDownloads] = React.useState<DownloadTask[]>([]);

	async function fetchDownloads(): Promise<void> {
		const res = await window.fetch('api/downloads');
		const downloads = await res.json();
		setDownloads(downloads);
	}

	React.useEffect(() => {
		fetchDownloads();
	}, []);

	return (
		<ul className="download-list">
			{downloads.map((download) => (
				<Capsule component="li" heading={download.name}>
					<td>{download.name}</td>
				</Capsule>
			))}
		</ul>
	);
}
