'use strict';

import Form from './form';

document.addEventListener('DOMContentLoaded', () => {
	const callBlock  = document.getElementById('call');
	const closeBtn   = document.getElementById('close-call');
	const submitForm = document.getElementById('submit-call');
	const form       = new Form('call-form');

	submitForm.addEventListener('click', () => {
		form.validateAndSend();
	});

	callBlock.addEventListener('click', (e) => {
		e.preventDefault();

		callBlock.classList.add('show');
	});

	closeBtn.addEventListener('click', (e) => {
		e.preventDefault();
		e.stopPropagation();

		callBlock.classList.remove('show')
	});
});