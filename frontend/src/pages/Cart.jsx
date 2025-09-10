import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";

export default function Cart() {
  const [cart, setCart] = useState({ items: [] });
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  // ✅ Load cart from backend
  useEffect(() => {
    API.get("/cart").then((res) => {
      setCart(res.data.cart || { items: [] });
    });
  }, []);

  const getTotal = () =>
    cart.items.reduce((total, item) => {
      if (item.productId?.price) {
        return total + item.productId.price * item.quantity;
      }
      return total;
    }, 0);

  const handleRemove = async (productId) => {
    try {
      await API.delete(`/cart/${productId}`);
      setCart((prev) => ({
        ...prev,
        items: prev.items.filter(
          (item) => item.productId && item.productId._id !== productId
        ),
      }));
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  const handleCheckout = () => {
    if (!email || !mobile || !address) {
      toast.error("Please enter Email, Mobile, and Address before placing the order.");
      return;
    }
    // ✅ Show QR code first
    setShowQR(true);
  };

  const handleConfirmPayment = async () => {
    try {
      // ✅ Send email to admin via Formspree
      const emailPayload = {
        email,
        mobile,
        address,
        message: "Order placed successfully!",
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

      // ✅ Clear cart & inputs
      setCart({ items: [] });
      setEmail("");
      setMobile("");
      setAddress("");
      setShowQR(false);

      // ✅ Show success
      setShowSuccessModal(true);

      setTimeout(() => {
        setShowSuccessModal(false);
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error("Error confirming payment:", err);
      toast.error("Something went wrong while placing the order.");
    }
  };

  return (
    <div className="container mx-auto mt-10">
      {/* ✅ QR Modal */}
      {showQR && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-[350px]">
            <h2 className="text-lg font-semibold mb-4">Scan to Pay</h2>
            <img
              src="/qr-code.png" // 👉 put your QR image in public/qr-code.png
              alt="QR Code"
              className="mx-auto w-48 h-48"
            />
            <button
              onClick={handleConfirmPayment}
              className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              I Have Paid
            </button>
          </div>
        </div>
      )}

      {/* ✅ Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg text-center shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              Order Placed Successfully 🎉
            </h3>
            <img
              width="100"
              className="mx-auto"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/White_check.svg/2048px-White_check.svg.png"
              alt="Success"
            />
          </div>
        </div>
      )}

      {/* 🛒 Cart UI */}
      <div className="sm:flex shadow-md my-10">
        {/* LEFT SIDE - CART ITEMS */}
        <div className="w-full sm:w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{cart.items.length} Items</h2>
          </div>

          {cart.items.map((item, index) => {
            const product = item.productId;
            if (!product) return null;
            return (
              <div
                key={product._id || index}
                className="md:flex items-strech py-8 border-t border-gray-200"
              >
                <div className="md:w-4/12 w-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-32 object-cover"
                  />
                </div>
                <div className="md:pl-3 md:w-8/12 flex flex-col justify-center">
                  <p className="text-sm">SKU: {product._id}</p>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-gray-600 text-sm">
                    Category: {product.category || "N/A"}
                  </p>
                  <div className="flex justify-between pt-3">
                    <button
                      onClick={() => handleRemove(product._id)}
                      className="text-red-500 text-sm underline"
                    >
                      Remove
                    </button>
                    <p className="font-bold">₹{product.price * item.quantity}</p>
                  </div>
                </div>
              </div>
            );
          })}

          <Link to="/" className="text-indigo-600 text-sm mt-6 inline-block">
            ← Continue Shopping
          </Link>
        </div>

        {/* RIGHT SIDE - SUMMARY */}
        <div className="w-full sm:w-1/4 md:w-1/2 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-6">Order Summary</h1>
          <div className="flex justify-between mt-6">
            <span className="text-sm">Items {cart.items.length}</span>
            <span className="text-sm">₹{getTotal()}</span>
          </div>
          <div className="py-4">
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 text-sm"
            />
          </div>
          <div className="pb-4">
            <label className="block text-sm mb-1">Mobile</label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full border p-2 text-sm"
            />
          </div>
          <div className="pb-4">
            <label className="block text-sm mb-1">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border p-2 text-sm"
            />
          </div>
          <div className="border-t pt-6">
            <div className="flex justify-between text-sm font-semibold">
              <span>Total cost</span>
              <span>₹{getTotal() + 50}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
