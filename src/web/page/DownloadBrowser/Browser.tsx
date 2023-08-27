import React from 'react';

import Capsule from '../../common/Capsule';

import type Folder from './Folder';
import FolderIcon from '../../icon/FolderIcon';
import DownloadCapsule from './DownloadCapsule';

interface BrowserProps {
	root: Folder;
}

export default function Browser({ root }: BrowserProps): JSX.Element {
	const folders = React.useMemo(
		() => root.getFolders().sort((a, b) => a.getName().localeCompare(b.getName())),
		[root],
	);
	const tasks = React.useMemo(
		() => root.getTasks().sort((a, b) => a.name.localeCompare(b.name)),
		[root],
	);
	return (
		<>
			{folders.map((folder) => (
				<Capsule component="li" className="folder" heading={folder.getName()}>
					<div className="thumbnail">
						<FolderIcon />
					</div>
				</Capsule>
			))}
			{tasks.map((task) => (
				<DownloadCapsule task={task} />
			))}
		</>
	);
}
