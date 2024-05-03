const nodemailer = require('nodemailer');

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
		? 'https://secure-file-sharing-app1.onrender.com'
		: 'http://localhost:3500';

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

module.exports = {
	addTimestampToFileName,
	removeTimestampFromFileName,
	sendVerificationEmail,
	sendInvitationEmail,
};
