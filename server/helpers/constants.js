const ENCODING_TYPE = 'hex';
const VERIFICATION_TOKEN_EXPIRES_IN = 1; // in hours
const MAX_FILE_NAME_LENGTH = 64;
const MB = 5; // 5 MB
const FILE_SIZE_LIMIT = MB * 1024 * 1024;
const MIME_TYPES = {
	'.docx':
		'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	'.doc': 'application/msword',
	'.pdf': 'application/pdf',
	'.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	'.xls': 'application/vnd.ms-excel',
	'.pptx':
		'application/vnd.openxmlformats-officedocument.presentationml.presentation',
	'.ppt': 'application/vnd.ms-powerpoint',
};

const ALLOWED_FILE_TYPES = Object.keys(MIME_TYPES);
const ACCESS_TOKEN_EXPIRES_IN = '15m'; // 15 min
const REFRESH_TOKEN_EXPRIRES_IN = '1d'; // 1 day

module.exports = {
	ENCODING_TYPE,
	VERIFICATION_TOKEN_EXPIRES_IN,
	MAX_FILE_NAME_LENGTH,
	MB,
	FILE_SIZE_LIMIT,
	MIME_TYPES,
	ALLOWED_FILE_TYPES,
	ACCESS_TOKEN_EXPIRES_IN,
	REFRESH_TOKEN_EXPRIRES_IN,
};
