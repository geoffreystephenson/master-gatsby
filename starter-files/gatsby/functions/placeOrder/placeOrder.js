const nodemailer = require('nodemailer');

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
	host: process.env.MAIL_HOST,
	port: 587,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS,
	},
});

exports.handler = async (event, context) => {
	// Test send email
	const info = await transporter.sendMail({
		from: "Slick's Slice <slick@example.com>",
		to: 'orders@example.com',
		subject: 'New order!',
		html: `<p>Your new order!</p>`,
	});
	console.log(info);
	return {
		statusCode: 200,
		body: JSON.stringify(info),
	};
};
