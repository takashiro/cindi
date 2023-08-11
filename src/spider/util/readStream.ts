import { Readable } from 'stream';

export default function readStream(readable: Readable): Promise<Buffer> {
	return new Promise((resolve, reject) => {
		const data: Buffer[] = [];

		readable.on('data', (chunk) => {
			data.push(chunk);
		});

		readable.on('end', () => {
			resolve(Buffer.concat(data));
		});

		readable.on('error', reject);
	});
}
