import React from 'react';

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

export function navigate(hash: string): void {
	window.location.href = hash;
}
