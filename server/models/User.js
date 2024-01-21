const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
	},
	password: {
		type: String,
		required: true,
	},
	roles: {
		type: [String],
		default: ['Employee'],
	},
	// active: {
	// 	type: Boolean,
	// 	default: true,
	// },
});

module.exports = mongoose.model('User', userSchema);
