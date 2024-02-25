const filesPayloadExists = (req, res, next) => {
	if (!req.files)
		return res.status(400).json({
			message: 'No files were uploaded.',
		});

	next();
};

module.exports = filesPayloadExists;
