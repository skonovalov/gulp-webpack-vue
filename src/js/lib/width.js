'use strict';

import {throttle} from 'lodash';
import screen from './screen';

document.addEventListener('DOMContentLoaded', () => {
	screen.setSize();

	window.addEventListener('resize', throttle(screen.setSize, 300));
});