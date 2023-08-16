import React from 'react';

interface ClickableProps extends React.HTMLAttributes<HTMLElement> {
	disabled?: boolean;
	onTrigger(e: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>): void;
}

export default function Clickable({
	role = 'button',
	disabled = false,
	tabIndex = disabled ? -1 : 0,
	onTrigger,
	onClick,
	onKeyDown,
	children,
	...otherProps
}: ClickableProps): JSX.Element {
	function handleClick(e: React.MouseEvent<HTMLElement>): void {
		onTrigger(e);
		onClick?.(e);
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLElement>): void {
		if (!e.altKey && !e.ctrlKey && !e.shiftKey && !e.metaKey && (e.key === ' ' || e.key === 'Enter')) {
			onTrigger(e);
		}
		onKeyDown?.(e);
	}

	return (
		<div // eslint-disable-line jsx-a11y/no-static-element-interactions
			role={role}
			tabIndex={tabIndex}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			{...otherProps} // eslint-disable-line react/jsx-props-no-spreading
		>
			{children}
		</div>
	);
}
