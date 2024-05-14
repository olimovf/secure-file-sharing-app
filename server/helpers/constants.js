const ENCODING_TYPE = 'hex';
const VERIFICATION_TOKEN_EXPIRES_AT = 1; // in hours
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

module.exports = {
	ENCODING_TYPE,
	VERIFICATION_TOKEN_EXPIRES_AT,
	MAX_FILE_NAME_LENGTH,
	MB,
	FILE_SIZE_LIMIT,
	ALLOWED_FILE_TYPES,
};
