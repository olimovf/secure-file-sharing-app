const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const asyncHandler = require('express-async-handler');
const File = require('../models/File');
const {
	addTimestampToFileName,
	removeTimestampFromFileName,
	saveActivity,
} = require('../helpers');
const {
	decryptFile,
	encryptFile,
	decryptText,
} = require('../helpers/encryption');
const KMS = require('../models/KMS');
const { setDHParams } = require('../helpers/dh');
const { MAX_FILE_NAME_LENGTH, ENCODING_TYPE } = require('../helpers/constants');
const User = require('../models/User');

// @desc File upload
// @route POST /files/upload
// @access Private

const uploadFiles = asyncHandler(async (req, res) => {
	let files = req.files.files;
	files = Array.isArray(files) ? files : [files];
	const userToId = req.body?.userTo;

	const userTo = await User.findById(userToId).exec();
	const publicKey = userTo?.publicKey;

	const userId = req?.user?.id;
	const kms = await KMS.findOne({ userId }).lean().exec();
	const secret = JSON.parse(decryptText(kms?.params, kms?.iv));

	const dh = setDHParams(secret);
	const sharedSecret = dh.computeSecret(
		Buffer.from(publicKey, ENCODING_TYPE),
		null,
		ENCODING_TYPE,
	);

	const uploadPromises = files.map(async (file) => {
		file.name = addTimestampToFileName(file.name);
		const iv = crypto.randomBytes(16).toString(ENCODING_TYPE);
		const encryptedBuffer = encryptFile(file, sharedSecret.slice(0, 64), iv);

		const dirPath = path.resolve(__dirname, '..', 'files');
		if (!fs.existsSync(dirPath)) {
			fs.mkdirSync(dirPath, { recursive: true });
		}

		const outputFilePath = path.resolve(dirPath, file.name);
		fs.writeFileSync(outputFilePath, encryptedBuffer);

		const newFile = new File({
			name: file.name,
			originalName: file.name,
			size: file.size,
			createdBy: userId,
			sharedBy: userId,
			sharedWith: userTo,
			iv,
		});

		await newFile.save();
	});

	try {
		await Promise.all(uploadPromises);

		await saveActivity({
			userId: userId,
			action: 'SHARE FILE',
			status: 'SUCCESS ✅',
		});

		return res.status(200).json({
			message: `${files.length === 1 ? 'File' : 'Files'} sent successfully`,
		});
	} catch (err) {
		await saveActivity({
			userId: userId,
			action: 'SHARE FILE',
			status: 'FAIL ❌',
		});

		return res.status(500).json({
			message: `Something went wrong while sending ${
				files.length === 1 ? 'a file' : 'files'
			}`,
		});
	}
});

// @desc Get all files
// @route GET /files
// @access Private

const getFiles = asyncHandler(async (req, res) => {
	const userId = req?.user?.id;
	let files = await File.find({
		$or: [
			{
				sharedBy: userId,
			},
			{
				sharedWith: userId,
			},
		],
	})
		.select('-originalName')
		.sort({ createdAt: -1 })
		.lean()
		.exec();

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
	const userId = req?.user?.id;

	const id = req.query?.id;
	if (!id) {
		return res.status(400).json({ message: 'File ID is required' });
	}

	const file = await File.findById(id).exec();
	if (!file) {
		await saveActivity({
			userId: userId,
			action: 'DOWNLOAD FILE',
			status: 'FAIL ❌',
		});
		return res.status(404).json({ message: 'File not found' });
	}

	const filePath = path.resolve(__dirname, '..', 'files', file.originalName);
	if (!fs.existsSync(filePath)) {
		await saveActivity({
			userId: userId,
			action: 'DOWNLOAD FILE',
			status: 'FAIL ❌',
		});

		return res.status(404).json({ message: 'File not found on server' });
	}

	const iv = file?.iv;
	let publicKey;
	if (file?.sharedBy.toString() === userId) {
		const userFrom = await User.findById(file?.sharedWith).exec();
		publicKey = userFrom?.publicKey;
	} else {
		const userFrom = await User.findById(file?.sharedBy).exec();
		publicKey = userFrom?.publicKey;
	}

	const kms = await KMS.findOne({ userId }).lean().exec();
	const secret = JSON.parse(decryptText(kms?.params, kms?.iv));

	const dh = setDHParams(secret);
	const sharedSecret = dh.computeSecret(
		Buffer.from(publicKey, ENCODING_TYPE),
		null,
		ENCODING_TYPE,
	);

	const buffer = decryptFile(filePath, sharedSecret.slice(0, 64), iv);

	await saveActivity({
		userId: userId,
		action: 'DOWNLOAD FILE',
		status: 'SUCCESS ✅',
	});

	res.end(buffer);
});

// @desc Delete a file
// @route DELETE /files
// @access Private

const deleteFile = asyncHandler(async (req, res) => {
	const id = req.body?.id;
	const userId = req?.user?.id;

	if (!id) {
		await saveActivity({
			userId: userId,
			action: 'DELETE FILE',
			status: 'FAIL ❌',
		});

		return res.status(400).json({ message: 'File ID is required' });
	}

	const file = await File.findById(id).exec();
	if (!file) {
		await saveActivity({
			userId: userId,
			action: 'DELETE FILE',
			status: 'FAIL ❌',
		});

		return res.status(400).json({ message: 'File not found' });
	}

	if (userId === file.createdBy) await file.deleteOne().exec();
	else await file.updateOne({ sharedWith: null }).exec();

	await saveActivity({
		userId: userId,
		action: 'DELETE FILE',
		status: 'SUCCESS ✅',
	});

	res.json({ message: 'File deleted successfully' });
});

// @desc Update a file
// @route PATCH /files
// @access Private

const updateFile = asyncHandler(async (req, res) => {
	const userId = req?.user?.id;
	const { id, name } = req.body;
	if (!id) {
		await saveActivity({
			userId: userId,
			action: 'UPDATE FILE',
			status: 'FAIL ❌',
		});

		return res.status(400).json({ message: 'File ID is required' });
	}
	if (!name.trim()) {
		await saveActivity({
			userId: userId,
			action: 'UPDATE FILE',
			status: 'FAIL ❌',
		});

		return res.status(400).json({ message: 'File name is required' });
	}
	if (name.trim().length > MAX_FILE_NAME_LENGTH) {
		await saveActivity({
			userId: userId,
			action: 'UPDATE FILE',
			status: 'FAIL ❌',
		});

		return res.status(400).json({
			message: `File name exceeds the maximum length of ${MAX_FILE_NAME_LENGTH} characters`,
		});
	}

	const file = await File.findById(id).exec();
	if (!file) {
		await saveActivity({
			userId: userId,
			action: 'UPDATE FILE',
			status: 'FAIL ❌',
		});

		return res.status(400).json({ message: 'File not found' });
	}

	// // Check for duplicate file name
	// const duplicate = await File.findOne({ createdBy: req?.user?.id, name })
	// 	.collation({ locale: 'en', strength: 2 })
	// 	.lean()
	// 	.exec();

	// // Allow renaming of the original file
	// if (duplicate && duplicate?._id.toString() !== id) {
	// 	return res
	// 		.status(409)
	// 		.json({ message: 'File with this name already exists' });
	// }

	file.name = name + file.name.slice(file.name.lastIndexOf('_'));
	await file.save();

	await saveActivity({
		userId: userId,
		action: 'UPDATE FILE',
		status: 'SUCCESS ✅',
	});

	res.json({ message: 'File updated successfully' });
});

const deleteDirectory = (path) => {
	if (fs.existsSync(path)) {
		fs.readdirSync(path).forEach(function (file) {
			const curPath = path + '/' + file;
			if (fs.lstatSync(curPath).isDirectory()) {
				deleteDirectory(curPath);
			} else {
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
		console.log(`Requested directory deleted successfully.`);
	} else {
		console.log(`Requested directory does not exist.`);
	}
};

const wipeFiles = asyncHandler(async (req, res) => {
	const directoryPath = path.join(__dirname, '..', 'files');
	deleteDirectory(directoryPath);
	res.json({ message: 'Deleted all files stored in the server' });
});

module.exports = {
	uploadFiles,
	getFiles,
	downloadFile,
	deleteFile,
	updateFile,
	wipeFiles,
};
