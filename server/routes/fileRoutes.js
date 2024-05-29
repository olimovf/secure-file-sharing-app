const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const fileUpload = require('express-fileupload');

const fileExtLimiter = require('../middleware/fileExtLimiter');
const fileSizeLimiter = require('../middleware/fileSizeLimiter');
const filesPayloadExists = require('../middleware/filesPayloadExists');
const verifyJWT = require('../middleware/verifyJWT');
const { ALLOWED_FILE_TYPES } = require('../helpers/constants');

router.route('/wipe-files').get(fileController.wipeFiles);

router.use(verifyJWT);

router
	.route('/upload')
	.post(
		fileUpload({ createParentPath: true }),
		filesPayloadExists,
		fileExtLimiter(ALLOWED_FILE_TYPES),
		fileSizeLimiter,
		fileController.uploadFiles,
	);

router
	.route('/')
	.get(fileController.getFiles)
	.delete(fileController.deleteFile)
	.patch(fileController.updateFile);

router.route('/download').get(fileController.downloadFile);

module.exports = router;
