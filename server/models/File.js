const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		name: {
			type: String,
			required: true,
		},
		size: {
			type: String,
			required: true,
		},
		// path: {
		// 	type: String,
		// 	required: true,
		// },
		password: {
			type: String,
		},
		expirationTime: {
			type: Date,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model('File', fileSchema);
