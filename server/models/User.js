const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		roles: {
			type: [String],
			default: ['User'],
		},
		token: {
			type: String,
		},
		tokenExpiresAt: {
			type: Date,
		},
		verified: {
			type: Boolean,
			default: false,
		},
		publicKey: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model('User', userSchema);
