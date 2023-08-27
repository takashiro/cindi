import React from 'react';

interface FileSizeProps {
	size: number;
}

const units: string[] = ['B', 'KB', 'MB', 'GB', 'TB'];

export default function DataSize({ size }: FileSizeProps): JSX.Element {
	let base = size;
	let level = 0;
	for (;;) {
		const next = base / 1024;
		if (next < 1) {
			break;
		}
		base = next;
		level++;
	}

	const unit = units[level];

	return (
		<span className="data-size">
			{`${base.toFixed(2)}${unit}`}
		</span>
	);
}
