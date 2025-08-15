const express = require('express');
const { auth } = require('../middlewares/authMiddleware');
const { addToCart, getCart, clearCart, removeFromCart } = require('../controllers/cartController');

const router = express.Router();

router.post('/', auth, addToCart);
router.get('/', auth, getCart);
router.delete('/', auth, clearCart);

// 👇 New route to remove one product
router.delete('/:productId', auth, removeFromCart);

module.exports = router;
