import React from 'react';
import type DownloadTask from '@cindi/model/DownloadTask';

import Folder from './Folder';
import Browser from './Browser';

import './index.scss';

export default function DownloadBrowser(): JSX.Element {
	const [downloads, setDownloads] = React.useState<DownloadTask[]>([]);

	async function fetchDownloads(): Promise<void> {
		const res = await window.fetch('api/downloads');
		const downloads = await res.json();
		setDownloads(downloads);
	}

	React.useEffect(() => {
		fetchDownloads();
	}, []);

	const root = new Folder('', downloads);
	return (
		<ul className="download-browser">
			<Browser root={root.simplify()} />
		</ul>
	);
}
