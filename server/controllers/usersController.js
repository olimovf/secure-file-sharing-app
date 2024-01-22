const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

// @desc Get all users
// @route GET /users
// @access Private

const getAllUsers = asyncHandler(async (req, res) => {
	const users = await User.find().select('-password').lean();
	if (!users?.length) {
		return res.status(400).json({ message: 'No users found' });
	}
	res.json(users);
});

// @desc Create new user
// @route POST /users
// @access Private

const createNewUser = asyncHandler(async (req, res) => {
	const { firstName, lastName, email, password, roles } = req.body;

	// confirm data
	if (!firstName || !lastName || !email || !password) {
		return res.status(400).json({ message: 'All fields are required' });
	}

	// check for duplicates
	const duplicate = await User.findOne({ email })
		// .collation({ locale: 'en', strength: 2 })
		.lean()
		.exec();
	if (duplicate) {
		return res.status(409).json({ message: 'Duplicate email' });
	}

	// hash the password
	const hashedPwd = await bcrypt.hash(password, 10); // salt rounds
	const userObject =
		!Array.isArray(roles) || !roles.length
			? { firstName, lastName, email, password: hashedPwd }
			: { firstName, lastName, email, password: hashedPwd, roles };

	// create and store user
	const user = await User.create(userObject);

	if (user) {
		res.status(201).json({ message: `New user ${firstName} created` });
	} else {
		res.status(400).json({ message: 'Invalid user data received' });
	}
});

// @desc Update a user
// @route PATCH /users
// @access Private

const updateUser = asyncHandler(async (req, res) => {
	const { id, email, roles, password } = req.body;

	// confirm data
	if (!id || !email || !Array.isArray(roles) || !roles.length) {
		return res.status(400).json({ message: 'All fields are required' });
	}

	const user = await User.findById(id).exec();
	if (!user) {
		return res.status(400).json({ message: 'User not found' });
	}

	// check for duplicate
	const duplicate = await User.findOne({ email })
		// .collation({ locale: 'en', strength: 2 })
		.lean()
		.exec();
	// allow updates to the original user
	if (duplicate && duplicate._id.toString() !== id) {
		return res.status(409).json({ message: 'Duplicate email' });
	}

	user.email = email;
	user.roles = roles;

	if (password) {
		// hash password
		user.password = await bcrypt.hash(password, 10);
	}

	const updatedUser = await user.save();

	res.json({ message: `${updatedUser.firstName} updated` });
});

// @desc Delete a user
// @route DELETE /users
// @access Private

const deleteUser = asyncHandler(async (req, res) => {
	const { id } = req.body;

	if (!id) {
		return res.status(400).json({ message: 'User ID required' });
	}

	// const note = await Note.findOne({ user: id }).lean().exec();
	// if (note) {
	// 	return res.status(400).json({ message: 'User has assigned notes' });
	// }

	const user = await User.findById(id).exec();
	if (!user) {
		return res.status(400).json({ message: 'User not found' });
	}

	await user.deleteOne();

	const reply = `Email ${user.email} with ID ${user._id} deleted`;

	res.json(reply);
});

module.exports = {
	getAllUsers,
	createNewUser,
	updateUser,
	deleteUser,
};
