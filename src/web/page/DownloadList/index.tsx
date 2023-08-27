import React from 'react';
import type DownloadTask from '@cindi/model/DownloadTask';

import DownloadCapsule from './DownloadCapsule';

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
			{downloads.map((task) => <DownloadCapsule task={task} />)}
		</ul>
	);
}
