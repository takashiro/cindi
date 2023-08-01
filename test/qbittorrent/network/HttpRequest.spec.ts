import { URLSearchParams } from 'url';
import FormData from 'form-data';
import { describe, it, expect } from '@jest/globals';

import { createFormData, createQuery } from '@cindi/qbittorrent/network/HttpRequest';

Object.defineProperty(global, 'URLSearchParams', {
	get() { return URLSearchParams; },
});

Object.defineProperty(global, 'FormData', {
	get() { return FormData; },
});

describe('URLSearchParams', () => {
	it('handles primitives', () => {
		const options = {
			a: 1,
			b: false,
			c: 'fake',
			d: [1, 2, 3],
		};
		const query = createQuery(options);
		expect(query).toBeTruthy();
	});
});

describe('FormData', () => {
	it('handles primitives', () => {
		const options = {
			a: 1,
			b: false,
			c: 'fake',
			d: [1, 2, 3],
		};
		const form = createFormData(options);
		expect(form).toBeTruthy();
	});
});
