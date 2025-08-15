const nodemailer = require('nodemailer');

exports.sendOrderEmail = async ({ orderId, customer, items, total }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_PASS
    }
  });

  // Create HTML rows for products
  const itemsHtml = items.map(item => `
    <tr>
      <td>${item.productId.name}</td>
      <td>${item.quantity}</td>
      <td>₹${item.productId.price}</td>
      <td>₹${item.productId.price * item.quantity}</td>
    </tr>
  `).join('');

  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: process.env.ADMIN_EMAIL,
    subject: `New Order #${orderId}`,
    html: `
      <h2>New Order Received</h2>
      <p><strong>Name:</strong> ${customer?.name || 'N/A'}</p>
      <p><strong>Email:</strong> ${customer?.email || 'N/A'}</p>
      <p><strong>Phone:</strong> ${customer?.phone || 'N/A'}</p>
      <table border="1" cellpadding="5" cellspacing="0">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>
      <h3>Total Amount: ₹${total}</h3>
    `
  };

  await transporter.sendMail(mailOptions);
};
