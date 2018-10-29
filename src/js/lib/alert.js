'use strict';

const alert = {
	elem : null,
	type : null,

	init(id) {
		alert.elem = document.getElementById(id);
	},

	show(type) {
		alert.type = type;
		alert.elem.classList.add('visible', type);

		setTimeout(() => this.hide(), 2000);
	},

	hide() {
		alert.elem.classList.remove('visible', alert.type);
	}
};

export default alert;