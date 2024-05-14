const Activity = require('../models/Activity');
const asyncHandler = require('express-async-handler');

// @desc Get all activity
// @route GET /activity
// @access Private

const getAllActivities = asyncHandler(async (req, res) => {
	const userId = req?.user?.id;
	const activities = await Activity.find({ userId }).lean().exec();

	res.json(activities);
});

const deleteAllActivities = asyncHandler(async (req, res) => {
	await Activity.deleteMany({});

	res.json({ message: 'Activities deleted succesfully' });
});

module.exports = {
	getAllActivities,
	deleteAllActivities,
};
