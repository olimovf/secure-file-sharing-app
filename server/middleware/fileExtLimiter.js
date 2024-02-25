const path = require('path');

const fileExtLimiter = (allowedExtArray) => {
	return (req, res, next) => {
		let files = req.files.files;
		files = Array.isArray(files) ? files : [files];

		const fileExtensions = [];
		files.forEach((file) => {
			fileExtensions.push(path.extname(file.name));
		});

		const allowed = fileExtensions.every((ext) =>
			allowedExtArray.includes(ext),
		);

		if (!allowed) {
			const message =
				`Upload failed. Only ${allowedExtArray.toString()} files allowed.`.replaceAll(
					',',
					', ',
				);

			return res.status(422).json({ message });
		}

		next();
	};
};

module.exports = fileExtLimiter;
