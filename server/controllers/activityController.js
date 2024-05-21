const Activity = require('../models/Activity');
const asyncHandler = require('express-async-handler');

// @desc Get all activity
// @route GET /activity
// @access Private

const getAllActivities = asyncHandler(async (req, res) => {
	const userId = req?.user?.id;
	const roles = req?.user?.roles;

	if (roles.includes('Admin')) {
		const all = await Activity.find({}).sort({ createdAt: -1 }).lean().exec();
		return res.json(all);
	}

	const userActivities = await Activity.find({ userId })
		.sort({ createdAt: -1 })
		.lean()
		.exec();
	res.json(userActivities);
});

const deleteAllActivities = asyncHandler(async (req, res) => {
	await Activity.deleteMany({});

	res.json({ message: 'Activities deleted succesfully' });
});

module.exports = {
	getAllActivities,
	deleteAllActivities,
};
