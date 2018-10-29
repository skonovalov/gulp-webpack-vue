'use strict';

import animate from 'velocity-animate';
import screen from './screen';

document.addEventListener('DOMContentLoaded', () => {
	const menu   = document.getElementById('nav');
	const topBtn = document.getElementById('scroll-footer');

	screen.subscribe(() => {
		if (screen.isMobile()) {
			menu.removeEventListener('click', menuDesktopHandler);
			topBtn.removeEventListener('click', scrollToFooter);
		} else {
			menu.addEventListener('click', menuDesktopHandler);
			topBtn.addEventListener('click', scrollToFooter);
		}
	});

	function menuDesktopHandler(e) {
		e.preventDefault();

		let link = e.target;

		if (link.tagName !== 'A') {
			return;
		}

		let id   = link.getAttribute('href').substr(1);
		let elem = document.getElementById(id);

		animate(elem,
			'scroll',
			{
				offset: -100,
				mobileHA: false
			}
		);
	}

	function scrollToFooter(e) {
		e.preventDefault();

		animate(document.getElementById('footer'),
			'scroll',
			{
				offset: -100,
				mobileHA: false
			}
		);
	}
});