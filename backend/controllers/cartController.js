const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {
  const { productId, quantity,size } = req.body;
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity }] });
    } else {
      const index = cart.items.findIndex(i => i.productId == productId);
      if (index > -1) {
        cart.items[index].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCart = async (req, res) => {
  const userId = req.user.id;
  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.user.id });
    res.json({ success: true, message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.productId;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    // Filter out the item safely
    cart.items = cart.items.filter(item => {
      if (!item.productId) return true; // keep if productId is missing (optional)
      return item.productId.toString() !== productId;
    });

    await cart.save();
    return res.json({ success: true, cart });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};
