const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Test SMTP connection
transporter.verify((err, success) => {
    if (err) console.log("SMTP Error:", err);
    else console.log("SMTP is ready to send emails");
});

module.exports = transporter;
