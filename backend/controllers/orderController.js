const Order = require('../models/Order');
const Cart = require('../models/Cart');
const User = require('../models/User');
const { sendOrderEmail } = require('../services/emailService');

exports.placeOrder = async (req, res) => {
  const userId = req.user?.id; // prevent crash if undefined
  console.log("Placing order for user:", userId);

  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart) {
      console.log("Cart not found");
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const total = cart.items.reduce((sum, item) => {
      if (!item.productId) {
        console.error("Product missing in cart item", item);
        return sum;
      }
      return sum + item.quantity * item.productId.price;
    }, 0);

    const order = new Order({
      userId,
      items: cart.items.map(i => ({
        productId: i.productId._id,
        quantity: i.quantity
      })),
      totalAmount: total
    });

    await order.save();
    await Cart.deleteOne({ userId });

    // Email to admin
    try {
      await sendOrderEmail(order);
    } catch (emailErr) {
      console.error("Email sending failed:", emailErr);
    }

    res.status(201).json({ success: true, order });
  } catch (err) {
    console.error("Order placing failed:", err);
    res.status(500).json({ message: err.message });
  }
};
