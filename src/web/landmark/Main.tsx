import React from 'react';

import { HashRoute, useLocationHash } from '../page/routes';
import MediaLibrary from '../page/MediaLibrary';
import Spider from '../page/Spider';

import './Main.scss';

const pageMap = new Map<string, React.ElementType>([
	[HashRoute.MediaLibrary, MediaLibrary],
	[HashRoute.Spider, Spider],
]);

export default function Main(): JSX.Element {
	const hash = useLocationHash();
	const Page = pageMap.get(hash) ?? MediaLibrary;
	return (
		<main>
			<Page />
		</main>
	);
}
