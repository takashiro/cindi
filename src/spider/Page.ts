import http from 'http';
import https from 'https';
import { URL } from 'url';
import type { Readable } from 'stream';
import { JSDOM } from 'jsdom';

import type { CssSelector, LinkLocator } from './model/Config';
import type Hyperlink from './model/Hyperlink';
import readStream from './util/readStream';

type Client = typeof http | typeof https;

const clientMap = new Map<string, Client>([
	['https:', https],
	['http:', http],
]);

function resolveClient(protocol: string): typeof http | typeof https {
	const client = clientMap.get(protocol);
	if (client) {
		return client;
	}
	throw new Error(`The protocol ${protocol} is not supported.`);
}

function openLink(link: URL): Promise<http.IncomingMessage> {
	return new Promise((resolve, reject) => {
		const client = resolveClient(link.protocol);
		client.get(link, (res) => {
			if (res.errored || res.statusCode !== 200) {
				reject(new Error(`Failed to read ${link}`));
			} else {
				resolve(res);
			}
		});
	});
}

export class Page {
	protected location: URL;

	protected dom?: JSDOM;

	constructor(location: string | URL) {
		this.location = typeof location === 'string' ? new URL(location) : location;
	}

	getLocation(): URL {
		return this.location;
	}

	async open(): Promise<void> {
		const res = await openLink(this.location);
		await this.openStream(res);
	}

	async openStream(input: Readable): Promise<void> {
		const content = await readStream(input);
		this.dom = new JSDOM(content);
	}

	close(): void {
		delete this.dom;
	}

	isOpen(): this is Page & { dom: JSDOM } {
		return Boolean(this.dom);
	}

	get document(): Document {
		this.checkOpen();
		return this.dom.window.document;
	}

	querySelector(selector: CssSelector): Element | null {
		return this.document.querySelector(selector);
	}

	querySelectorAll(selector: CssSelector): NodeListOf<Element> {
		return this.document.querySelectorAll(selector);
	}

	queryLink({ selector, property }: LinkLocator): Hyperlink | undefined {
		const a = this.querySelector(selector);
		if (!a) {
			return;
		}
		return this.resolveLink(a, property);
	}

	queryLinks({ selector, property }: LinkLocator): Hyperlink[] {
		const targets = this.querySelectorAll(selector);
		const links: Hyperlink[] = [];
		for (const a of targets) {
			links.push(this.resolveLink(a, property));
		}
		return links;
	}

	protected resolveLink(a: Element, property = 'href'): Hyperlink {
		const href = a.getAttribute(property);
		return {
			name: a.getAttribute('aria-label') ?? a.textContent ?? '',
			location: href ? new URL(href, this.location) : undefined,
		};
	}

	protected checkOpen(): asserts this is Page & { dom: JSDOM } {
		if (!this.isOpen()) {
			throw new Error('The page is not open.');
		}
	}
}

export default Page;
