import React from 'react';
import classNames from 'classnames';

import './index.scss';

interface CapsuleProps extends React.HTMLAttributes<HTMLElement> {
	heading: React.ReactNode;

	component?: React.ElementType;
}

export default function Capsule({
	heading,
	component: Component = 'div',
	className,
	children,
	...otherProps
}: CapsuleProps): JSX.Element {
	return (
		<Component
			className={classNames('capsule', className)}
			{...otherProps}
		>
			<h2>{heading}</h2>
			{children}
		</Component>
	);
}
