'use strict';

import screen from './screen';

document.addEventListener('DOMContentLoaded', () => {
	const body   = document.body;
	const header = document.getElementById('header');
	const btn    = document.getElementById('toggleMenu');
	const nav    = header.querySelector('ul');

	screen.subscribe(() => {
		if (screen.isMobile()) {
			btn.addEventListener('click', btnClick);
			nav.addEventListener('click', menuClick);

			window.removeEventListener('scroll', addHeaderClass);
		} else {
			btn.removeEventListener('click', btnClick);
			window.addEventListener('scroll', addHeaderClass);

			removeMobileHeader();
		}
	});

	function menuClick(e) {
		if (e.target.tagName !== 'A') {
			return;
		}

		removeMobileHeader();
	}

	function btnClick() {
		header.classList.toggle('open');
		body.classList.toggle('overflow');
	}

	function addHeaderClass() {
		if (this.pageYOffset >= header.offsetHeight) {
			header.classList.add('header-fixed');
		} else {
			header.classList.remove('header-fixed');
		}
	}

	function removeMobileHeader() {
		header.classList.remove('open');
		body.classList.remove('overflow');
	}
});