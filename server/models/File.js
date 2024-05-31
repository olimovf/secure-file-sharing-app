const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		originalName: {
			type: String,
			required: true,
		},
		size: {
			type: Number,
			required: true,
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		sharedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		sharedWith: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			default: null,
		},
		iv: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model('File', fileSchema);
