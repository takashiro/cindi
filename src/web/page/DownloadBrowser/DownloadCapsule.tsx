import React from 'react';
import type DownloadTask from '@cindi/model/DownloadTask';

import Capsule, { Main, Thumbnail } from '../../common/Capsule';
import VideoIcon from '../../icon/VideoIcon';
import DataSize from '../../common/DataSize';

interface DownloadCapsuleProps {
	task: DownloadTask;
}

export default function DownloadCapsule({ task }: DownloadCapsuleProps): JSX.Element {
	return (
		<Capsule component="li">
			<Thumbnail>
				<VideoIcon />
				<DataSize size={task.size} />
			</Thumbnail>
			<Main>
				<div className="name">{task.name}</div>
			</Main>
		</Capsule>
	);
}
