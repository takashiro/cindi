import type { Router } from 'express';

import spider from './spider';

const api = new Map<string, Router>([
	['/spider', spider],
]);

export default api;
