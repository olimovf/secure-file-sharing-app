const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		size: {
			type: Number,
			required: true,
		},
		password: {
			type: String,
		},
		expirationTime: {
			type: Date,
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		sharedWith: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model('File', fileSchema);
