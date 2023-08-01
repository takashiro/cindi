export type ValueTransform = (key: string, value: unknown) => string | string[] | void;

export type RequestParams = Record<string, string | string[]>;

export function transformParams(
	options?: Record<string, unknown>,
	...transforms: ValueTransform[]
): RequestParams {
	const query: RequestParams = {};
	if (!options) {
		return query;
	}

	for (const [name, value] of Object.entries(options)) {
		if (typeof value === 'string') {
			query[name] = value;
		} else if (typeof value === 'number' || typeof value === 'boolean') {
			query[name] = String(value);
		} else if (transforms.length > 0) {
			for (const transform of transforms) {
				const actual = transform(name, value);
				if (Array.isArray(actual) || typeof actual === 'string') {
					query[name] = actual;
					break;
				}
			}
		}
	}

	return query;
}

export function transformArray(name: string, delimiter?: string): ValueTransform {
	if (delimiter) {
		return (k, v) => {
			if (!Array.isArray(v) || k !== name) {
				return;
			}
			return [v.join(delimiter)];
		};
	}

	return (k, v) => {
		if (!Array.isArray(v) || k !== name) {
			return;
		}
		return v;
	};
}

export function createQuery(
	options?: Record<string, unknown>,
	...transforms: ValueTransform[]
): URLSearchParams {
	const params = transformParams(options, ...transforms);
	const query = new URLSearchParams();
	for (const [name, value] of Object.entries(params)) {
		if (Array.isArray(value)) {
			for (const v of value) {
				query.append(name, v);
			}
		} else {
			query.append(name, value);
		}
	}
	return query;
}

export function createFormData(
	options?: Record<string, unknown>,
	...transforms: ValueTransform[]
): FormData {
	const params = transformParams(options, ...transforms);
	const form = new FormData();
	for (const [name, value] of Object.entries(params)) {
		if (Array.isArray(value)) {
			for (const v of value) {
				form.append(name, v);
			}
		} else {
			form.append(name, value);
		}
	}
	return form;
}
