const path = require('path');
const asyncHandler = require('express-async-handler');

// @desc FileUpload
// @route POST /upload
// @access Private
const uploadFile = asyncHandler(async (req, res) => {
	let files = req.files.files;
	files = Array.isArray(files) ? files : [files];

	files.forEach((file) => {
		const filepath = path.join(__dirname, 'files', file.name);
		file.mv(filepath, (err) => {
			if (err) return res.status(500).json({ message: err });
		});
	});

	return res.status(200).json({
		message: `${files.length === 1 ? 'File' : 'Files'} uploaded successfully.`,
	});
});

module.exports = {
	uploadFile,
};
