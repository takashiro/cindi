import React from 'react';

import Banner from './landmark/Banner';
import Main from './landmark/Main';

import './global.scss';
import Navigation from './landmark/Navigation';

export default function App(): JSX.Element {
	return (
		<>
			<Navigation />
			<Banner />
			<Main />
		</>
	);
}
