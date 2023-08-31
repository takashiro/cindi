import React from 'react';
import ClientBrowser from '@cindi/client/Browser';

import CapsuleList from './CapsuleList';

import './index.scss';
import Clickable from '../../../common/Clickable';

interface BrowserProps {
	browser: ClientBrowser;
}

export default function Browser({ browser }: BrowserProps): JSX.Element {
	const [location, setLocation] = React.useState<string[]>([]);

	React.useEffect(() => {
		browser.on('navigated', setLocation);
		return () => {
			browser.off('navigated', setLocation);
		};
	}, [browser]);

	const navigate = (name: string): void => {
		browser.enter(name);
	};

	const goHome = () => browser.goHome();

	const entries = browser.getEntries();
	return (
		<div className="browser">
			<Clickable onTrigger={goHome}>Home</Clickable>
			{location.length > 0 && (
				<ul className="nav">
					{location.map((folder) => <li>{folder}</li>)}
				</ul>
			)}
			<CapsuleList entries={entries} onTrigger={navigate} />
		</div>
	);
}
