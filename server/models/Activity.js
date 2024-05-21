const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		ip: {
			type: String,
			required: true,
		},
		action: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model('Activity', activitySchema);
