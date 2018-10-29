'use strict';

let currentSize = '';
let events      = [];

function publish() {
	events.forEach(cb => cb());
}

export default {
	setSize() {
		let elems = document.querySelectorAll('[data-screen]');

		elems.forEach(item => {
			let screen = item.dataset.screen;

			if (item.offsetWidth > 0 && screen !== currentSize) {
				currentSize = screen;

				publish();
			}
		});
	},

	getSize() {
		return currentSize;
	},

	isMobile() {
		return this.getSize() === 'mobile';
	},

	isDesktop() {
		return this.getSize() === 'desktop';
	},

	subscribe(cb) {
		if (! events.includes(cb)) {
			events.push(cb);
		}
	},

	remove(cb) {
		if (events.includes(cb)) {
			events.splice(events.indexOf(cb), 1);
		}
	}
};