import {
	jest,
	describe,
	it,
	expect,
} from '@jest/globals';

import Schedule from '@cindi/vigilia/Schedule';

jest.useFakeTimers();

function idle(msecs: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, msecs);
	});
}

describe('Execute an async function', () => {
	const worker = jest.fn(() => idle(50));
	const schedule = new Schedule(worker);

	it('is not started', () => {
		schedule.setFrequency(100);

		expect(schedule.isStarted()).toBe(false);
		expect(schedule.isStopped()).toBe(true);
		expect(schedule.isRunning()).toBe(false);
	});

	it('is started', () => {
		schedule.start();

		expect(schedule.isStarted()).toBe(true);
		expect(schedule.isStopped()).toBe(false);
	});

	it('is running', () => {
		expect(worker).toBeCalledTimes(1);
		expect(schedule.isRunning()).toBe(true);
	});

	it('is not running soon', async () => {
		jest.advanceTimersByTime(50);
		await Promise.resolve();
		expect(worker).toBeCalledTimes(1);
		expect(schedule.isRunning()).toBe(false);
	});

	it('is running again after 50ms', async () => {
		jest.advanceTimersByTime(50);
		await Promise.resolve();
		expect(worker).toBeCalledTimes(2);
		expect(schedule.isRunning()).toBe(true);
	});

	it('is stopping', () => {
		schedule.stop();

		expect(schedule.isStarted()).toBe(false);
		expect(schedule.isStopped()).toBe(false);
		expect(schedule.isStopping()).toBe(true);
	});

	it('is stopped after 50ms', () => {
		jest.advanceTimersByTime(50);

		expect(schedule.isStopped()).toBe(false);
		expect(schedule.isStopping()).toBe(true);
	});

	it('will not be running after 50ms', () => {
		jest.advanceTimersByTime(50);

		expect(schedule.isStopped()).toBe(true);
	});
});

describe('Handle errors', () => {
	const worker = () => {
		throw new Error('unknown');
	};
	const schedule = new Schedule(worker, 100);

	it('should handle an error', async () => {
		const handler = jest.fn();
		schedule.once('error', handler);
		schedule.start();
		await Promise.resolve();
		expect(handler).toBeCalledTimes(1);
	});

	it('should handle multiple errors', async () => {
		const handler = jest.fn();
		schedule.on('error', handler);

		jest.advanceTimersByTime(100);
		await Promise.resolve();
		expect(handler).toBeCalledTimes(1);

		jest.advanceTimersByTime(100);
		await Promise.resolve();
		expect(handler).toBeCalledTimes(2);
	});
});
