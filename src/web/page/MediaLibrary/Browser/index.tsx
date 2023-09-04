import React from 'react';
import ClientBrowser from '@cindi/client/Browser';

import CapsuleList from './CapsuleList';
import Clickable from '../../../common/Clickable';
import NavIcon from '../../../icon/NavIcon';

import './index.scss';

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
			<div className="nav">
				<NavIcon />
				<ul>
					<li>
						<Clickable onTrigger={goHome}>Home</Clickable>
					</li>
					{location.map((folder) => (
						<li>
							{folder}
						</li>
					))}
				</ul>
			</div>
			<CapsuleList entries={entries} onTrigger={navigate} />
		</div>
	);
}
