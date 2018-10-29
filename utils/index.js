module.exports = {
	getContext(args, dirs) {
		let layouts = [];

		if (args.length > 0) {
			layouts.push(args.map((item) => {
				return item.substr(2);
			}));

			return layouts;
		} else {
			return dirs;
		}
	}
};