'use strict';

import {throttle} from 'lodash';
import screen from './screen';
import CountUp from 'countup.js';

document.addEventListener('DOMContentLoaded', () => {
	const sections     = document.querySelectorAll('.section');

	screen.subscribe(() => {
		if (screen.isMobile()) {
			setClassToSections();
		} else {
			animateTop();
			animateSections();
		}
	});

	const animateClass = 'animate';
	const options = {
		  useEasing: true,
		  useGrouping: true,
		  separator: ' ',
		  decimal: '.',
		};

	window.addEventListener('scroll', throttle(animateSections, 300));

	function animateSections() {
		let top = window.pageYOffset;

		sections.forEach(item => {
			let itemHeight = (item.offsetHeight / 2) < 300 ? 300 : (item.offsetHeight / 2);
			let offsetTop  = (top >= item.offsetTop - itemHeight);
			let afterBlock = (top <= (item.offsetTop + item.offsetHeight));

			if (offsetTop && (afterBlock - itemHeight) && ! item.classList.contains('animate')) {
				item.classList.add(animateClass);

				if (item.getAttribute('id') === 'deals') {
					count();
				}

				if (item.getAttribute('id') === 'testimonials') {
					document.getElementById('footer').classList.add(animateClass);
				}
			}
		});

	}

	function animateTop() {
		document.getElementById('top').classList.add(animateClass);;
	}

	function setClassToSections() {
		sections.forEach(item => item.classList.add(animateClass));
		document.getElementById('footer').classList.add(animateClass);

		count();
	}

	function count() {
		let demo = new CountUp('counter1', 0, 593, 0, 2.5, options);
		let demo1 = new CountUp('counter2', 0, 114, 0, 2.5, options);
		let demo2 = new CountUp('counter3', 0, 143, 0, 2.5, options);
		let demo3 = new CountUp('counter4', 0, 61000, 0, 2.5, options);

		demo.start();
		demo1.start();
		demo2.start();
		demo3.start();
	}
});