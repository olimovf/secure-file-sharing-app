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

const sendVerificationEmail = async (user, token) => {
	const verificationLink = `http://localhost:3500/users/verify/${user._id}/${token}`;

	const mailOptions = {
		from: {
			name: 'Secure File Sharing Application',
			address: process.env.USER,
		},
		to: user.email,
		subject: 'Please verify your email address',
		html: `
			<p>Hello ${user.firstName},</p>
			<p>Please verify your email address by clicking the following link:</p>
			<p><a href="${verificationLink}">${verificationLink}</a></p>
    `,
	};

	transporter.sendMail(mailOptions);
};

module.exports = {
	addTimestampToFileName,
	removeTimestampFromFileName,
	sendVerificationEmail,
};
