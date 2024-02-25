const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');

const fileExtLimiter = require('../middleware/fileExtLimiter');
const fileSizeLimiter = require('../middleware/fileSizeLimiter');
const filesPayloadExists = require('../middleware/filesPayloadExists');
const fileUpload = require('express-fileupload');

router
	.route('/')
	.post(
		fileUpload({ createParentPath: true }),
		filesPayloadExists,
		fileExtLimiter(['.docx', '.pdf', '.pptx']),
		fileSizeLimiter,
		fileController.uploadFile,
	);

module.exports = router;
