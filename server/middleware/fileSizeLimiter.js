const { FILE_SIZE_LIMIT, MB } = require('../helpers/constants');

const fileSizeLimiter = (req, res, next) => {
	let files = req.files.files;
	files = Array.isArray(files) ? files : [files];
	const filesOverLimit = [];

	files.forEach((file) => {
		if (file.size > FILE_SIZE_LIMIT) {
			filesOverLimit.push(file.name);
		}
	});

	if (filesOverLimit.length) {
		const properVerb = filesOverLimit.length > 1 ? 'are' : 'is';

		const sentence =
			`Upload failed. ${filesOverLimit.toString()} ${properVerb} over the file size limit of ${MB} MB.`.replaceAll(
				',',
				', ',
			);

		const message =
			filesOverLimit.length < 3
				? sentence.replace(',', ' and')
				: sentence.replace(/,(?=[^,]*$)/, ' and');

		return res.status(413).json({ message });
	}

	next();
};

module.exports = fileSizeLimiter;
