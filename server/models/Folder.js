const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema(
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
		items: [
			{
				type: mongoose.Schema.Types.ObjectId,
				refPath: 'itemsModel',
			},
		],
		itemsModel: {
			type: String,
			enum: ['File', 'Folder'],
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model('Folder', folderSchema);
