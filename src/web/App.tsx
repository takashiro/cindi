import React from 'react';

import Banner from './landmark/Banner';
import Navigation from './landmark/Navigation';
import Main from './landmark/Main';

import './global.scss';

export default function App(): JSX.Element {
	return (
		<>
			<Banner />
			<div className="main-frame">
				<Navigation />
				<Main />
			</div>
		</>
	);
}
