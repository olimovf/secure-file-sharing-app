const crypto = require('crypto');
const fs = require('fs');
const { ENCODING_TYPE } = require('./constants');

const encryptFile = (file, key, iv) => {
	const cipher = crypto.createCipheriv(
		process.env.ALGORITHM,
		Buffer.from(key, ENCODING_TYPE),
		Buffer.from(iv, ENCODING_TYPE),
	);
	const encryptedBuffer = Buffer.concat([
		cipher.update(file.data),
		cipher.final(),
	]);

	return encryptedBuffer;
};

const decryptFile = (filePath, key, iv) => {
	const encryptedBuffer = fs.readFileSync(filePath);
	const decipher = crypto.createDecipheriv(
		process.env.ALGORITHM,
		Buffer.from(key, ENCODING_TYPE),
		Buffer.from(iv, ENCODING_TYPE),
	);
	const decryptedBuffer = Buffer.concat([
		decipher.update(encryptedBuffer),
		decipher.final(),
	]);

	return decryptedBuffer;
};

const encryptText = (text, iv) => {
	const cipher = crypto.createCipheriv(
		process.env.ALGORITHM,
		Buffer.from(process.env.SECRET_KEY, ENCODING_TYPE),
		Buffer.from(iv, ENCODING_TYPE),
	);
	let encrypted = cipher.update(text, 'utf8', ENCODING_TYPE);
	encrypted += cipher.final(ENCODING_TYPE);
	return encrypted;
};

const decryptText = (encryptedText, iv) => {
	const decipher = crypto.createDecipheriv(
		process.env.ALGORITHM,
		Buffer.from(process.env.SECRET_KEY, ENCODING_TYPE),
		Buffer.from(iv, ENCODING_TYPE),
	);
	let decrypted = decipher.update(encryptedText, ENCODING_TYPE, 'utf8');
	decrypted += decipher.final('utf8');
	return decrypted;
};

module.exports = {
	encryptFile,
	decryptFile,
	encryptText,
	decryptText,
};
