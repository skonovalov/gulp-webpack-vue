'use strict';

export default class Form {
	constructor(id) {
		this.form        = document.getElementById(id);
		this.actionUrl   = this.form.getAttribute('action');
		this.method      = this.form.getAttribute('method');
		this.type        = this.form.dataset.type;
		this.errorString = this.form.querySelector('.form__error');
		this.fields      = this.pushFields();
		this.errors      = 0;
	}

	pushFields() {
		let inputs = this.form.querySelectorAll('input, textarea');

		return Array.prototype.slice.call(inputs);
	}

	isEmpty(value) {
		return value.trim().length === 0;
	}

	validateAndSend() {
		this.resetErrors();

		this.fields.forEach(item => {
			if (this.isEmpty(item.value)) {
				this.incrementError();

				item.classList.add('error');
			} else {
				item.classList.remove('error');
			}
		});

		if (this.hasErrors()) {
			this.errorString.classList.remove('hidden');
		} else {
			this.errorString.classList.add('hidden');

			this.sendForm();
		}
	}

	incrementError() {
		++this.errors;
	}

	hasErrors() {
		return this.errors > 0;
	}

	resetErrors() {
		this.errors = 0;
	}

	reset() {
		this.resetErrors();

		this.fields.forEach(item => item.value = '');
	}

	sendForm() {
		const xhr = new XMLHttpRequest();
		let  body = this.fields.map(item => `${item.name}=${encodeURIComponent(item.value)}`).join('&');

		body += `&type=${this.type}`; console.log(body);

		xhr.open(this.method, this.actionUrl);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.addEventListener('readystatechange', (response) => {
			if (xhr.status === 200) {
				this.reset();
			}

			console.log(response);
		});

		xhr.send(body);
	};
}