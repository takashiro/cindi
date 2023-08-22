import { config } from './util/Config';
import app from '.';

(async function main(): Promise<void> {
	await config.read();
	app.listen(config.getPort());
}());
