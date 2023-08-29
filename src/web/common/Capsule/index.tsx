import React from 'react';
import classNames from 'classnames';

import './index.scss';

interface CapsuleProps extends React.HTMLAttributes<HTMLElement> {
	component?: React.ElementType;
}

export function Thumbnail({
	className,
	...otherProps
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
	return <div className={classNames('thumbnail', className)} {...otherProps} />;
}

export function Main({
	className,
	...otherProps
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
	return <div className={classNames('main', className)} {...otherProps} />;
}

export default function Capsule({
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
			{children}
		</Component>
	);
}
