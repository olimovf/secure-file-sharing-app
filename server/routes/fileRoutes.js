const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const fileUpload = require('express-fileupload');

const fileExtLimiter = require('../middleware/fileExtLimiter');
const fileSizeLimiter = require('../middleware/fileSizeLimiter');
const filesPayloadExists = require('../middleware/filesPayloadExists');
const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT);

router
	.route('/upload')
	.post(
		fileUpload({ createParentPath: true }),
		filesPayloadExists,
		fileExtLimiter(['.docx', '.pdf', '.pptx']),
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
