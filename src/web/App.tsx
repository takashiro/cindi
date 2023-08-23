import React from 'react';

import Banner from './landmark/Banner';
import Main from './landmark/Main';

import './global.scss';

export default function App(): JSX.Element {
	return (
		<>
			<Banner />
			<Main />
		</>
	);
}
