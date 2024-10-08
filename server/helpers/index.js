const nodemailer = require('nodemailer');
const Activity = require('../models/Activity');

const addTimestampToFileName = (fileName) => {
	const timestamp = Date.now().toString();
	const dot = fileName.lastIndexOf('.');
	return fileName.slice(0, dot) + '_' + timestamp + fileName.slice(dot);
};

const removeTimestampFromFileName = (fileName) => {
	const _ = fileName.lastIndexOf('_');
	const dot = fileName.lastIndexOf('.');
	return fileName.slice(0, _) + fileName.slice(dot);
};

const transporter = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: process.env.USER,
		pass: process.env.PASS,
	},
});

const BASE_URL =
	process.env.NODE_ENV === 'production'
		? 'https://secure-file-sharing-app.onrender.com'
		: 'http://localhost:5173';

const sendVerificationEmail = async (user, token) => {
	const verificationLink = `${BASE_URL}/users/verify/${user._id}/${token}`;

	const mailOptions = {
		from: {
			name: 'Secure File Sharing',
			address: process.env.USER,
		},
		to: user.email,
		subject: 'Verify your email address',
		html: `
			<p>Dear ${user.firstName},</p>
			<p>Please click on the link below to verify your email address:</p>
			<p><a href="${verificationLink}">${verificationLink}</a></p>
			<p>Note that this link will expire in <b>1 hour</b>.</p>
    `,
	};

	transporter.sendMail(mailOptions);
};

const sendInvitationEmail = async (user) => {
	const invitationLink = `${BASE_URL}/users/invitation/${user._id}`;

	const mailOptions = {
		from: {
			name: 'Secure File Sharing',
			address: process.env.USER,
		},
		to: user.email,
		subject: 'Invitation',
		html: `
			<p>Dear ${user.firstName},</p>
			<p>You have been invited to Secure File Sharing Application.</p>
			<p>Please click on the link below to set a password for your account:</p>
			<p><a href="${invitationLink}">${invitationLink}</a></p>
    `,
	};

	transporter.sendMail(mailOptions);
};

const saveActivity = async ({ userId, action, status }) => {
	const userIp = await fetch('https://api.ipify.org/?format=json').then(
		(data) => data.json(),
	);
	const activity = new Activity({ userId, ip: userIp?.ip, action, status });
	await activity.save();
};

module.exports = {
	addTimestampToFileName,
	removeTimestampFromFileName,
	sendVerificationEmail,
	sendInvitationEmail,
	saveActivity,
};
