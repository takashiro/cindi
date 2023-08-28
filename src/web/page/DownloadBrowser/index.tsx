import React from 'react';
import { useClient } from '@cindi/client';
import type DownloadTask from '@cindi/model/DownloadTask';

import FolderIcon from '../../icon/FolderIcon';
import Capsule from '../../common/Capsule';
import DownloadCapsule from './DownloadCapsule';

import './index.scss';

export default function DownloadBrowser(): JSX.Element {
	const client = useClient();
	const [folders, setFolders] = React.useState<string[]>();
	const [downloads, setDownloads] = React.useState<DownloadTask[]>();

	const fetchDownloads = async (): Promise<void> => {
		const root = await client.getRootFolder();
		setFolders(root.getFolderNames());
		setDownloads(root.getTasks());
	};

	React.useEffect(() => {
		fetchDownloads();
	}, []);

	return (
		<ul className="download-browser">
			{folders?.map((folder) => (
				<Capsule component="li" className="folder" heading={folder}>
					<div className="thumbnail">
						<FolderIcon />
					</div>
				</Capsule>
			))}
			{downloads?.map((task) => (
				<DownloadCapsule task={task} />
			))}
		</ul>
	);
}
