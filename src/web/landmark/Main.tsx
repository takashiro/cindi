import React from 'react';

import DownloadBrowser from '../page/DownloadBrowser';

import './Main.scss';

export default function Main(): JSX.Element {
	return (
		<main>
			<DownloadBrowser />
			<button type="submit">Submit</button>
			<button type="button">Cancel</button>
		</main>
	);
}
