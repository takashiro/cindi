import React from 'react';

import './Main.scss';
import DownloadList from '../page/DownloadList';

export default function Main(): JSX.Element {
	return (
		<main>
			<DownloadList />
			<button type="submit">Submit</button>
			<button type="button">Cancel</button>
		</main>
	);
}
