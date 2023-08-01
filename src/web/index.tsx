import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

(async function main(): Promise<void> {
	const rootNode = document.getElementById('root');
	if (!rootNode) {
		throw new Error('Root node is not defined.');
	}

	const root = createRoot(rootNode);
	root.render(<App />);
}());
