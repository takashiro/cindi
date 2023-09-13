import React from 'react';

import Clickable from '../common/Clickable';
import SearchIcon from '../icon/SearchIcon';
import { HashRoute, navigate } from '../page/routes';

import './Banner.scss';

export default function Banner(): JSX.Element {
	const search = () => {
		navigate(HashRoute.Spider);
	};
	return (
		<header>
			<div className="light-sphere" />
			<h1>Home Media Center</h1>
			<Clickable className="search-box" onTrigger={search}>
				<SearchIcon />
				<span className="placeholder">Search resources...</span>
			</Clickable>
		</header>
	);
}
