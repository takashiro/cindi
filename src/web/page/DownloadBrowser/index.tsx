import React from 'react';
import { useClient } from '@cindi/client';
import type DownloadTask from '@cindi/model/DownloadTask';

import Folder from './Folder';
import Browser from './Browser';

import './index.scss';

export default function DownloadBrowser(): JSX.Element {
	const client = useClient();
	const [downloads, setDownloads] = React.useState<DownloadTask[]>([]);

	async function fetchDownloads(): Promise<void> {
		const downloads = await client.getDownloads();
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
