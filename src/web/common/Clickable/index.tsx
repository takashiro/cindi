import React from 'react';

interface ClickableProps<T> extends React.HTMLAttributes<T> {
	component?: React.ElementType;
	disabled?: boolean;
	onTrigger(e: React.KeyboardEvent<T> | React.MouseEvent<T>): void;
}

export default function Clickable<T = HTMLElement>({
	component: Component = 'div',
	role = 'button',
	disabled = false,
	tabIndex = disabled ? -1 : 0,
	onTrigger,
	onClick,
	onKeyDown,
	children,
	...otherProps
}: ClickableProps<T>): JSX.Element {
	const handleClick = (e: React.MouseEvent<T>): void => {
		onTrigger(e);
		onClick?.(e);
	};

	const handleKeyDown = (e: React.KeyboardEvent<T>): void => {
		if (!e.altKey && !e.ctrlKey && !e.shiftKey && !e.metaKey && (e.key === ' ' || e.key === 'Enter')) {
			onTrigger(e);
		}
		onKeyDown?.(e);
	};

	return (
		<Component
			role={role}
			tabIndex={tabIndex}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			{...otherProps}
		>
			{children}
		</Component>
	);
}
