import React from 'react';
import type DownloadTask from '@cindi/model/DownloadTask';

import Capsule from '../../common/Capsule';
import VideoIcon from '../../icon/VideoIcon';
import DataSize from '../../common/DataSize';

interface DownloadCapsuleProps {
	task: DownloadTask;
}

export default function DownloadCapsule({ task }: DownloadCapsuleProps): JSX.Element {
	return (
		<Capsule component="li" heading={task.name}>
			<div className="thumbnail">
				<VideoIcon />
				<DataSize size={task.size} />
			</div>
		</Capsule>
	);
}
