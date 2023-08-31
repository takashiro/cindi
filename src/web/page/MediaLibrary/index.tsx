import React from 'react';
import { useClient } from '@cindi/client';
import type ClientBrowser from '@cindi/client/Browser';

import Browser from './Browser';

export default function MediaLibrary(): JSX.Element | undefined {
	const browser = React.useRef<ClientBrowser>();
	const [loading, setLoading] = React.useState(true);
	const client = useClient();

	const fetch = async (): Promise<void> => {
		browser.current = await client.getBrowser();
		setLoading(false);
	};

	React.useEffect(() => {
		fetch();
	}, []);

	if (loading) {
		return;
	}
	return browser.current && <Browser browser={browser.current} />;
}
