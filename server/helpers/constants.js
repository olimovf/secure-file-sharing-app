const ENCODING_TYPE = 'hex';
const VERIFICATION_TOKEN_EXPIRES_IN = 1; // in hours
const MAX_FILE_NAME_LENGTH = 64;
const MB = 5; // 5 MB
const FILE_SIZE_LIMIT = MB * 1024 * 1024;
const ALLOWED_FILE_TYPES = [
	'.docx',
	'.doc',
	'.pdf',
	'.xlsx',
	'.xls',
	'.pptx',
	'.ppt',
];
const ACCESS_TOKEN_EXPIRES_IN = '15m'; // 15 min
const REFRESH_TOKEN_EXPRIRES_IN = '1d'; // 1 day

module.exports = {
	ENCODING_TYPE,
	VERIFICATION_TOKEN_EXPIRES_IN,
	MAX_FILE_NAME_LENGTH,
	MB,
	FILE_SIZE_LIMIT,
	ALLOWED_FILE_TYPES,
	ACCESS_TOKEN_EXPIRES_IN,
	REFRESH_TOKEN_EXPRIRES_IN,
};
