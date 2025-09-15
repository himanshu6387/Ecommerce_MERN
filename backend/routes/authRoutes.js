const express = require('express');
const router = express.Router();
const { register, login, forgetPassword, resetPasswordVerify } = require('../controllers/authController');

router.post('/signup', register);
router.post('/login', login);
router.post('/forgot-password', forgetPassword);
router.post('/reset-password/:token',resetPasswordVerify);

module.exports = router;
