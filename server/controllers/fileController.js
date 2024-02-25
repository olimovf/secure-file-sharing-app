const path = require('path');
const asyncHandler = require('express-async-handler');
const File = require('../models/File');

// @desc FileUpload
// @route POST /upload
// @access Private
const uploadFiles = asyncHandler(async (req, res) => {
	let files = req.files.files;
	files = Array.isArray(files) ? files : [files];

	const uploadPromises = files.map(async (file) => {
		const timestamp = Date.now();
		const br = file.name.lastIndexOf('.');
		const newName = `${file.name.slice(0, br)}_${timestamp}${file.name.slice(
			br,
		)}`;
		file.name = newName;

		await file.mv(path.resolve(__dirname, '..', 'files', file.name));

		const newFile = new File({
			name: file.name,
			size: file.size,
			createdBy: req?.user?.id,
		});

		await newFile.save();
	});

	await Promise.all(uploadPromises);

	return res.status(200).json({
		message: `${files.length === 1 ? 'File' : 'Files'} uploaded successfully.`,
	});
});

module.exports = {
	uploadFiles,
};
