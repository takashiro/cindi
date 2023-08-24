import React from 'react';

import SearchIcon from '../icon/SearchIcon';
import Clickable from '../common/Clickable';

import './Navigation.scss';

export default function Navigation(): JSX.Element {
	const search = () => {
		// ignore
	};

	return (
		<nav>
			<Clickable className="search-box" onTrigger={search}>
				<SearchIcon />
				Search resources...
			</Clickable>
		</nav>
	);
}
