import type { Router } from 'express';

import spider from './spider';
import downloads from './downloads';

const api = new Map<string, Router>([
	['/spider', spider],
	['/downloads', downloads],
]);

export default api;
