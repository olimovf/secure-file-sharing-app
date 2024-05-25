const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { saveActivity } = require('../helpers');
const {
	ACCESS_TOKEN_EXPIRES_IN,
	REFRESH_TOKEN_EXPRIRES_IN,
} = require('../helpers/constants');

// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ message: 'All fields are required' });
	}

	const foundUser = await User.findOne({ email }).exec();

	if (!foundUser) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	if (!foundUser.verified) {
		await saveActivity({
			userId: foundUser._id,
			action: 'LOGIN',
			status: 'FAIL ❌',
		});

		return res.status(401).json({
			message: 'Your email has not been verified yet',
		});
	}

	const match = await bcrypt.compare(password, foundUser.password);

	if (!match) {
		await saveActivity({
			userId: foundUser._id,
			action: 'LOGIN',
			status: 'FAIL ❌',
		});

		return res.status(401).json({ message: 'Incorrect email or password' });
	}

	const accessToken = jwt.sign(
		{
			UserInfo: {
				id: foundUser._id,
				roles: foundUser.roles,
			},
		},
		process.env.ACCESS_TOKEN_SECRET,
		{ expiresIn: ACCESS_TOKEN_EXPIRES_IN },
	);

	const refreshToken = jwt.sign(
		{ id: foundUser._id },
		process.env.REFRESH_TOKEN_SECRET,
		{ expiresIn: REFRESH_TOKEN_EXPRIRES_IN },
	);

	// Create secure cookie with refresh token
	res.cookie('jwt', refreshToken, {
		httpOnly: true, //accessible only by web server
		secure: true, //https
		sameSite: 'None', //cross-site cookie
		maxAge: parseInt(REFRESH_TOKEN_EXPRIRES_IN) * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
	});

	await saveActivity({
		userId: foundUser._id,
		action: 'LOGIN',
		status: 'SUCCESS ✅',
	});

	// Send accessToken containing email and roles
	res.json({ accessToken });
});

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
	const cookies = req.cookies;

	if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });

	const refreshToken = cookies.jwt;

	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		asyncHandler(async (err, decoded) => {
			if (err) return res.status(403).json({ message: 'Forbidden' });

			const foundUser = await User.findById(decoded?.id).exec();

			if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });

			const accessToken = jwt.sign(
				{
					UserInfo: {
						id: foundUser._id,
						roles: foundUser.roles,
					},
				},
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: ACCESS_TOKEN_EXPIRES_IN },
			);

			res.json({ accessToken });
		}),
	);
};

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = async (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(204); //No content
	res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
	res.json({ message: 'Cookie cleared' });
};

module.exports = {
	login,
	refresh,
	logout,
};
