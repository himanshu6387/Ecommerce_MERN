import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api"; // adjust the path if needed

const Cart = ({ cart, setCart }) => {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [showQRModal, setShowQRModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  // Show QR modal instead of placing order immediately
  const handleCheckout = () => {
    if (!email || !mobile || !address) {
      toast.error("Please enter Email, Mobile, and Address before placing the order.");
      return;
    }
    setShowQRModal(true);
  };

  // When user clicks "I’ve Paid"
  const handlePaymentDone = async () => {
    try {
      // Save order with Pending Payment status
      await API.post("/orders", {
        email,
        mobile,
        address,
        items: cart.items,
        status: "Pending Payment", // 👈 important
      });

      // Optionally send email
      const emailPayload = {
        email,
        mobile,
        address,
        message: "Order placed successfully! Pending payment verification.",
        orderDetails: cart.items.map((item) => ({
          name: item.productId?.name,
          quantity: item.quantity,
          price: item.productId?.price,
        })),
      };

      await fetch("https://formspree.io/f/xpwqdvpg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailPayload),
      });

      // Clear cart and inputs
      setCart({ items: [] });
      setEmail("");
      setMobile("");
      setAddress("");

      // Close QR modal
      setShowQRModal(false);

      // Show success modal
      setShowSuccessModal(true);

      setTimeout(() => {
        setShowSuccessModal(false);
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Failed to place order");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>

      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.items.map((item, index) => (
              <li key={index} className="mb-2">
                {item.productId?.name} - {item.quantity} × ₹{item.productId?.price}
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <input
              type="email"
              placeholder="Email"
              className="border p-2 mb-2 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Mobile"
              className="border p-2 mb-2 w-full"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <textarea
              placeholder="Address"
              className="border p-2 mb-2 w-full"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <button
            onClick={handleCheckout}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Place Order
          </button>
        </>
      )}

      {/* QR Modal */}
      {showQRModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-xl font-bold mb-4">Scan to Pay</h2>
            <img
              src="/images/your-qr.png" // 👈 put your QR code here
              alt="QR Code"
              className="mx-auto mb-4 w-60 h-60"
            />
            <p className="text-gray-600 mb-4">Please scan this QR to complete your payment.</p>
            <button
              onClick={handlePaymentDone}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              I’ve Paid
            </button>
            <button
              onClick={() => setShowQRModal(false)}
              className="ml-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Order Placed</h2>
            <p>Your order has been placed and is pending payment verification.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
