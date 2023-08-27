import React from 'react';

export default function FolderIcon(): JSX.Element {
	return (
		<svg className="folder-icon" viewBox="0 0 24 24" fill="currentColor">
			<path d="M7,12h2v2H7V12z M15,12v2h2v-2H15z" />
			<g>
				<rect x="15" y="12" width="2" height="2" />
				<rect x="7" y="12" width="2" height="2" />
				<path d="M20,6h-9L9,4H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8C22,6.9,21.1,6,20,6z M18,17h-1v-1h-2v1H9v-1H7v1   H6V9h1v1h2V9h6v1h2V9h1V17z" />
			</g>
		</svg>
	);
}
