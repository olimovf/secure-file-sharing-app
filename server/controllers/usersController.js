const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { sendVerificationEmail, sendInvitationEmail } = require('../helpers');

const VERIFICATION_TOKEN_EXPIRES_AT = 1; // in hours

// @desc Get all users
// @route GET /users
// @access Private

const getAllUsers = asyncHandler(async (req, res) => {
	const users = await User.find()
		.select('-password -token -tokenExpiresAt')
		.lean();
	// if (!users?.length) {
	// 	return res.status(400).json({ message: 'No users found' });
	// }
	res.json(users);
});

// @desc Create new user
// @route POST /users
// @access Private

const createNewUser = asyncHandler(async (req, res) => {
	const {
		firstName,
		lastName,
		email,
		password,
		roles,
		type = 'register',
	} = req.body;

	console.log(req.body);

	// confirm data
	if (!firstName || !lastName || !email || (type === 'register' && !password)) {
		return res.status(400).json({ message: 'All fields are required' });
	}

	// check for duplicates
	const duplicate = await User.findOne({ email })
		.collation({ locale: 'en', strength: 2 })
		.lean()
		.exec();
	if (duplicate) {
		return res.status(409).json({ message: 'This email already exists' });
	}

	// hash the password
	const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

	const token = uuidv4();
	const hashedToken = await bcrypt.hash(token, 10);

	const tokenExpiresAt = new Date(
		Date.now() + VERIFICATION_TOKEN_EXPIRES_AT * 60 * 60 * 1000,
	);

	const userObject = {
		firstName,
		lastName,
		email,
		password: hashedPwd,
		token: hashedToken,
		tokenExpiresAt,
	};

	if (Array.isArray(roles) && roles.length) {
		userObject.roles = roles;
	}

	// create and store user
	const user = await User.create(userObject);

	if (user) {
		if (type === 'invitation') {
			await sendInvitationEmail(user);
		} else {
			await sendVerificationEmail(user, token);
		}

		const resMsg =
			type === 'invitation'
				? 'User created successfully'
				: 'You are registered successfully. Please, check your email for verification.';

		res.status(201).json({
			message: resMsg,
		});
	} else {
		res.status(400).json({ message: 'Invalid user data received' });
	}
});

// @desc Update a user
// @route PATCH /users
// @access Private

const updateUser = asyncHandler(async (req, res) => {
	const { id, firstName, lastName, email, roles, password } = req.body;

	// confirm data
	if (
		!id ||
		!firstName ||
		!lastName ||
		!email ||
		!Array.isArray(roles) ||
		!roles.length
	) {
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
		return res.status(409).json({ message: 'This email already exists' });
	}

	user.firstName = firstName;
	user.lastName = lastName;
	user.email = email;
	user.roles = roles;

	if (password) {
		// hash password
		user.password = await bcrypt.hash(password, 10);
	}

	await user.save();

	res.json({ message: 'User updated successfully' });
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

	res.json({ message: 'User deleted succesfully' });
});

// @desc Verify a user email
// @route GET /users/verify/:userId/:token
// @access Public

const verifyUserEmail = asyncHandler(async (req, res) => {
	const { userId, token } = req.params;

	if (!userId || !token) {
		return res.status(400).json({ message: 'Invalid verification link' });
	}

	const user = await User.findById(userId).exec();

	if (!user) {
		return res
			.status(404)
			.json({ message: 'User not found or verification link has expired' });
	}

	const { token: userToken, tokenExpiresAt, verified } = user;

	if (verified) {
		return res.status(400).json({ message: 'Email has already been verified' });
	}

	if (!userToken || !tokenExpiresAt) {
		return res
			.status(400)
			.json({ message: 'Verification link is not complete' });
	}

	if (tokenExpiresAt < Date.now()) {
		await user.deleteOne();

		return res.status(400).json({
			message: 'Verification link has expired. Please sign up again.',
		});
	}

	const match = await bcrypt.compare(token, userToken);

	if (match) {
		user.verified = true;
		await user.save();
		return res.status(200).json({ message: 'Email verified successfully' });
	} else {
		return res.status(400).json({ message: 'Invalid verification link' });
	}
});

// @desc Set a password
// @route GET /users/invitation/:userId
// @access Public

const setPassword = asyncHandler(async (req, res) => {
	const { userId } = req.params;

	if (!userId) {
		return res.status(400).json({ message: 'Invalid invitation link' });
	}

	const user = await User.findById(userId).exec();

	if (!user) {
		return res.status(404).json({ message: 'User not found' });
	}

	const match = await bcrypt.compare(token, userToken);

	if (match) {
		user.verified = true;
		await user.save();
		return res.status(200).json({ message: 'Email verified successfully' });
	} else {
		return res.status(400).json({ message: 'Invalid verification link' });
	}
});

module.exports = {
	getAllUsers,
	createNewUser,
	updateUser,
	deleteUser,
	verifyUserEmail,
	setPassword,
};
