import React from 'react';
import type Folder from '@cindi/client/Folder';

import Clickable from '../../../common/Clickable';
import Capsule, { Main, Thumbnail } from '../../../common/Capsule';
import FolderIcon from '../../../icon/FolderIcon';

interface FolderCapsuleProps {
	entry: Folder;
	onTrigger(name: string): void;
}

export default function FolderCapsule({ entry, onTrigger }: FolderCapsuleProps): JSX.Element {
	const handleTrigger = (): void => {
		onTrigger(entry.getName());
	};

	return (
		<Clickable component={Capsule} className="folder" onTrigger={handleTrigger}>
			<Thumbnail>
				<FolderIcon />
			</Thumbnail>
			<Main>
				<div className="name">{entry.getName()}</div>
			</Main>
		</Clickable>
	);
}
