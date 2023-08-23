import express from 'express';
import api from './api';

const app = express();
app.use(express.json());

for (const [contextPath, router] of api) {
	app.use(contextPath, router);
}

export default app;

export * from './model';
