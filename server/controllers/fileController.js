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
		message: `${files.length === 1 ? 'File' : 'Files'} uploaded successfully`,
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

// @desc Download a file
// @route GET /files/download
// @access Private

const downloadFile = asyncHandler(async (req, res) => {
	const id = req.query?.id;
	if (!id) {
		return res.status(400).json({ message: 'File ID is required' });
	}

	const file = await File.findById(id).exec();
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
	const id = req.body?.id;
	if (!id) {
		return res.status(400).json({ message: 'File ID is required' });
	}

	const file = await File.findById(id).exec();
	if (!file) {
		return res.status(400).json({ message: 'File not found' });
	}

	await file.deleteOne();
	res.json({ message: 'File deleted successfully' });
});

// @desc Update a file
// @route PATCH /files
// @access Private

const updateFile = asyncHandler(async (req, res) => {
	const { id, name } = req.body;
	if (!id || !name) {
		return res.status(400).json({ message: 'All fields are required' });
	}

	const file = await File.findById(id).exec();
	if (!file) {
		return res.status(400).json({ message: 'File not found' });
	}

	// Check for duplicate file name
	const duplicate = await File.findOne({ createdBy: req?.user?.id, name })
		.collation({ locale: 'en', strength: 2 })
		.lean()
		.exec();

	// Allow renaming of the original file
	if (duplicate && duplicate?._id.toString() !== id) {
		return res.status(409).json({ message: 'Duplicate file name' });
	}

	file.name = name;
	await file.save();

	res.json({ message: 'File updated successfully' });
});

module.exports = {
	uploadFiles,
	getFiles,
	downloadFile,
	deleteFile,
	updateFile,
};
