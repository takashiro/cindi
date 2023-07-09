import { jest, it, expect } from '@jest/globals';

import Vigilia from '@cindi/vigilia';
import Schedule from '@cindi/vigilia/Schedule';

const vigilia = new Vigilia();

jest.useFakeTimers();

it('adds a runnable', () => {
	const runnable = jest.fn();
	const schedule = new Schedule(runnable, 10);
	vigilia.add(schedule);
	expect(schedule.isStarted()).toBe(true);
	vigilia.remove(0);
	expect(schedule.isStopping()).toBe(true);
});
