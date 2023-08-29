import React from 'react';
import { useClient } from '@cindi/client';
import type Folder from '@cindi/client/Folder';
import type DownloadTask from '@cindi/model/DownloadTask';

import FolderIcon from '../../icon/FolderIcon';
import Clickable from '../../common/Clickable';
import Capsule, { Main, Thumbnail } from '../../common/Capsule';

import DownloadCapsule from './DownloadCapsule';

import './index.scss';

interface Navigator {
	root?: Folder;
	current?: Folder;
}

function useNavigator(): Navigator {
	const ref = React.useRef<Navigator>();
	if (!ref.current) {
		ref.current = {};
	}
	return ref.current;
}

export default function DownloadBrowser(): JSX.Element {
	const client = useClient();
	const nav = useNavigator();

	const [folders, setFolders] = React.useState<string[]>();
	const [downloads, setDownloads] = React.useState<DownloadTask[]>();

	const navigate = (to: Folder): void => {
		nav.current = to;
		setFolders(to.getFolderNames());
		setDownloads(to.getTasks());
	};

	const handleClick = (e: React.MouseEvent<HTMLElement>): void => {
		const target = e.currentTarget as HTMLElement;
		const name = target.querySelector('.name')?.textContent;
		const folder = name && nav.current?.getFolder(name);
		if (folder) {
			navigate(folder);
		}
	};

	const fetchDownloads = async (): Promise<void> => {
		const root = await client.getRootFolder();
		nav.root = root;
		navigate(root);
	};

	React.useEffect(() => {
		fetchDownloads();
	}, []);

	return (
		<ul className="download-browser">
			{folders?.map((folder) => (
				<li key={folder}>
					<Clickable component={Capsule} className="folder" onTrigger={handleClick}>
						<Thumbnail>
							<FolderIcon />
						</Thumbnail>
						<Main>
							<div className="name">{folder}</div>
						</Main>
					</Clickable>
				</li>
			))}
			{downloads?.map((task) => (
				<li key={task.name}>
					<DownloadCapsule task={task} />
				</li>
			))}
		</ul>
	);
}
