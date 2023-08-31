import React from 'react';
import type DownloadTask from '@cindi/client/DownloadTask';

import Capsule, { Main, Thumbnail } from '../../../common/Capsule';
import DataSize from '../../../common/DataSize';
import Clickable from '../../../common/Clickable';
import VideoIcon from '../../../icon/VideoIcon';

interface DownloadCapsuleProps {
	entry: DownloadTask;
	onTrigger(name: string): void;
}

export default function DownloadCapsule({ entry, onTrigger }: DownloadCapsuleProps): JSX.Element {
	const handleTrigger = () => {
		onTrigger(entry.getName());
	};
	return (
		<Clickable component={Capsule} className="download-task" onTrigger={handleTrigger}>
			<Thumbnail>
				<VideoIcon />
				<DataSize size={entry.getSize()} />
			</Thumbnail>
			<Main>
				<div className="name">{entry.getName()}</div>
			</Main>
		</Clickable>
	);
}
