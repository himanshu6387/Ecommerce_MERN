const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const transporter = require('../config/nodemailer');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.json({ token, user: { name: user.name, email: user.email, isAdmin: user.isAdmin } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) return res.status(400).json({ message: "Email is required" });

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Email not found" });

        // Generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
        user.resetToken = token;
        user.resetTokenExpire = Date.now() + 15 * 60 * 1000;
        await user.save();

        // Reset link
        const resetLink = `/auth/reset-password/${token}`

        // Send email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset Request',
            html: `
                <h3>Password Reset Request</h3>
                <p>Click the link below to reset your password:</p>
                <a href="${resetLink}" target="_blank">Reset Password</a>
                <p>This link will expire in 15 minutes.</p>
            `
        });

        res.json({ message: "Reset link sent to your email" });
    } catch (error) {
        console.error("Forget Password Error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

exports.resetPasswordVerify = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!password) return res.status(400).json({ message: "Password is required" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user || user.resetToken !== token || user.resetTokenExpire < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        user.password = await bcrypt.hash(password, 10);
        user.resetToken = undefined;
        user.resetTokenExpire = undefined;
        await user.save();

        res.json({ message: "Password reset successfully" });
    } catch (error) {
        console.error("Reset Password Error:", error);
        res.status(400).json({ message: "Invalid or expired token" });
    }
};