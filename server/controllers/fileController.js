const path = require('path');
const fs = require('fs');
const asyncHandler = require('express-async-handler');
const File = require('../models/File');
const {
	addTimestampToFileName,
	removeTimestampFromFileName,
} = require('../helpers');

// @desc File upload
// @route POST /files/upload
// @access Private

const uploadFiles = asyncHandler(async (req, res) => {
	let files = req.files.files;
	files = Array.isArray(files) ? files : [files];

	const uploadPromises = files.map(async (file) => {
		file.name = addTimestampToFileName(file.name);

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

// @desc Get all files
// @route GET /files
// @access Private

const getFiles = asyncHandler(async (req, res) => {
	let files = await File.find({ createdBy: req?.user?.id }).lean().exec();
	// if (!files?.length) {
	// 	return res.status(400).json({ message: 'No files found' });
	// }
	files = files.map((file) => {
		return {
			...file,
			name: removeTimestampFromFileName(file.name),
		};
	});

	res.json(files);
});

const downloadFile = asyncHandler(async (req, res) => {
	const fileId = req.query.id;
	const file = await File.findById(fileId);

	if (!file) {
		return res.status(404).json({ message: 'File not found' });
	}

	const filePath = path.resolve(__dirname, '..', 'files', file.name);

	if (!fs.existsSync(filePath)) {
		return res.status(404).json({ message: 'File not found on server' });
	}

	res.download(filePath, file.name);
});

// @desc Delete a file
// @route DELETE /files
// @access Private

const deleteFile = asyncHandler(async (req, res) => {
	const { id } = req.body;

	// Confirm data
	if (!id) {
		return res.status(400).json({ message: 'File ID is required' });
	}

	// Confirm file exists to delete
	const file = await File.findById(id).exec();

	if (!file) {
		return res.status(400).json({ message: 'File not found' });
	}

	await file.deleteOne();

	const reply = `File '${file.name}' with ID ${file._id} deleted`;

	res.json(reply);
});

module.exports = {
	uploadFiles,
	getFiles,
	downloadFile,
	deleteFile,
};
