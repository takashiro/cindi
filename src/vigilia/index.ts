import { EventEmitter } from 'events';

import Schedule from './Schedule';

interface Vigilia {
	on(event: 'added', listener: (schedule: Schedule) => void): this;
	on(event: 'removed', listener: (schedule: Schedule) => void): this;

	once(event: 'added', listener: (schedule: Schedule) => void): this;
	once(event: 'removed', listener: (schedule: Schedule) => void): this;

	off(event: 'added', listener: (schedule: Schedule) => void): this;
	off(event: 'removed', listener: (schedule: Schedule) => void): this;

	emit(event: 'added', schedule: Schedule): boolean;
	emit(event: 'removed', schedule: Schedule): boolean;
}

class Vigilia extends EventEmitter {
	schedules: Schedule[] = [];

	add(schedule: Schedule): void {
		schedule.start();
		this.schedules.push(schedule);
		this.emit('added', schedule);
	}

	remove(index: number): void {
		const [me] = this.schedules.splice(index, 1);
		if (!me) {
			return;
		}
		me.stop();
		this.emit('removed', me);
	}

	getSchedules(): Schedule[] {
		return [...this.schedules];
	}
}

export default Vigilia;
