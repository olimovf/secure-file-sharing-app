const crypto = require('crypto');
const { ENCODING_TYPE } = require('./constants');

const generateDHParams = () => {
	const dh = crypto.getDiffieHellman('modp14');
	dh.generateKeys();

	const params = {
		publicKey: dh.getPublicKey(ENCODING_TYPE),
		privateKey: dh.getPrivateKey(ENCODING_TYPE),
		prime: dh.getPrime(ENCODING_TYPE),
		generator: dh.getGenerator(ENCODING_TYPE),
	};

	return params;
};

const setDHParams = ({ prime, generator, privateKey }) => {
	const dh = crypto.createDiffieHellman(
		prime,
		ENCODING_TYPE,
		generator,
		ENCODING_TYPE,
	);
	dh.setPrivateKey(Buffer.from(privateKey, ENCODING_TYPE));
	dh.generateKeys();
	return dh;
};

module.exports = {
	generateDHParams,
	setDHParams,
};
