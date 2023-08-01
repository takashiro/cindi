import { Method } from './Http';

export interface ReadOptions {
	query?: URLSearchParams;
	headers?: Record<string, string>;
}

export interface RequestOptions extends ReadOptions {
	body?: BodyInit;
}

export interface FetchApi {
	(input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response>;
}

export default class HttpClient {
	private serverUrl: string;

	private fetch: FetchApi;

	constructor(serverUrl: string, fetch: FetchApi) {
		this.serverUrl = serverUrl;
		this.fetch = fetch;
	}

	get(api: string, options?: ReadOptions): Promise<Response> {
		return this.request(Method.Get, api, options);
	}

	post(api: string, options?: RequestOptions): Promise<Response> {
		return this.request(Method.Post, api, options);
	}

	async request(method: Method, api: string, options?: RequestOptions): Promise<Response> {
		let context: string;
		if (options?.query) {
			context = `${api}?${options.query.toString()}`;
		} else {
			context = api;
		}

		const headers: Record<string, string> = {
			accept: 'application/json',
			...options?.headers,
		};

		return this.fetch(`${this.serverUrl}${context}`, {
			method,
			headers,
			body: options?.body,
		});
	}
}
