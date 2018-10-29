'use strict';

import Form from './form';

document.addEventListener('DOMContentLoaded', () => {
	const submitFooterForm = document.getElementById('submit-footer');
	const footerForm       = new Form('footer-form');

	submitFooterForm.addEventListener('click', () => {
		footerForm.validateAndSend();
	});
});