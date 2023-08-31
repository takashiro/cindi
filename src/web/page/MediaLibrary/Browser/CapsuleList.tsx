import React from 'react';
import type Entry from '@cindi/client/Entry';
import Folder from '@cindi/client/Folder';
import DownloadTask from '@cindi/client/DownloadTask';

import FolderCapsule from './FolderCapsule';
import DownloadCapsule from './DownloadCapsule';

interface EntryProps {
	entry: Entry;
	onTrigger(name: string): void;
}

function EntryCapsule({ entry, onTrigger }: EntryProps): JSX.Element | null {
	if (entry instanceof Folder) {
		return <FolderCapsule entry={entry} onTrigger={onTrigger} />;
	}

	if (entry instanceof DownloadTask) {
		return <DownloadCapsule entry={entry} onTrigger={onTrigger} />;
	}
	return null;
}

interface CapsuleListProps {
	entries: Entry[];
	onTrigger(name: string): void;
}

export default function CapsuleList({ entries, onTrigger }: CapsuleListProps): JSX.Element {
	return (
		<ul>
			{entries?.map((entry) => (
				<li key={entry.getName()}>
					<EntryCapsule entry={entry} onTrigger={onTrigger} />
				</li>
			))}
		</ul>
	);
}
