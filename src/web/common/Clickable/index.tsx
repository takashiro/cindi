import React from 'react';

interface ClickableProps extends React.HTMLAttributes<HTMLElement> {
	component?: React.ElementType;
	disabled?: boolean;
	onTrigger(e: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>): void;
}

export default function Clickable({
	component: Component = 'div',
	role = 'button',
	disabled = false,
	tabIndex = disabled ? -1 : 0,
	onTrigger,
	onClick,
	onKeyDown,
	children,
	...otherProps
}: ClickableProps): JSX.Element {
	const handleClick = (e: React.MouseEvent<HTMLElement>): void => {
		onTrigger(e);
		onClick?.(e);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>): void => {
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
