const mongoose = require('mongoose');

const kmsSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	params: {
		type: String,
		required: true,
	},
	iv: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('KMS', kmsSchema);
