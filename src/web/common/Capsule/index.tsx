import React from 'react';
import classNames from 'classnames';

interface CapsuleProps extends React.HTMLAttributes<HTMLElement> {
	heading: React.ReactNode;
}

export default function Capsule({
	heading,
	className,
	children,
	...otherProps
}: CapsuleProps): JSX.Element {
	return (
		<div
			className={classNames('capsule', className)}
			{...otherProps}
		>
			<h2>{heading}</h2>
			{children}
		</div>
	);
}
