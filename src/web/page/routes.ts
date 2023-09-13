import React from 'react';

export const enum HashRoute {
	MediaLibrary = '#library',
	Spider = '#spider',
}

export function useLocationHash(): string {
	const [contextPath, setContextPath] = React.useState(window.location.hash);
	React.useEffect(() => {
		const handleHashChange = (): void => {
			setContextPath(window.location.hash);
		}
		window.addEventListener('hashchange', handleHashChange);
		return () => window.removeEventListener('hashchange', handleHashChange);
	}, []);
	return contextPath;
}

export function navigate(hash: HashRoute): void {
	window.location.href = hash;
}
