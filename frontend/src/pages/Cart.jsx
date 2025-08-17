import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Cart() {
  const [cart, setCart] = useState({ items: [] });
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false); // ✅ modal state
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/cart').then(res => {
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
      setCart(prevCart => ({
        ...prevCart,
        items: prevCart.items.filter(item => item.productId && item.productId._id !== productId)
      }));
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };


  const handleCheckout = async () => {
    if (!email || !mobile || !address) {
      toast.error("Please enter Email, Mobile, and Address before placing the order.");
      return;
    }

    try {
      // Place order
      await API.post('/orders');

      // Send email to admin via Formspree
      const emailPayload = {
        email,
        mobile,
        address,
        message: "Order placed successfully!",
        orderDetails: cart.items.map(item => ({
          name: item.productId?.name,
          quantity: item.quantity,
          price: item.productId?.price,
        }))
      };

      await fetch("https://formspree.io/f/xpwqdvpg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailPayload)
      });

      // Clear cart
      setCart({ items: [] });
      setEmail("");
      setMobile("");
      setAddress("");

      // Show success modal
      setShowSuccessModal(true);

      // Redirect after 2 seconds
      setTimeout(() => {
        setShowSuccessModal(false);
        navigate('/');
      }, 2000);

    } catch (err) {
      console.error("Checkout error:", err);
      alert("Failed to place order");
    }
  };

  return (
    <div className="container mx-auto mt-10">
      {/* ✅ Success Modal */}
      {
        showSuccessModal && (
          <div>
            <div id="modal">
              <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto">
                <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
                  <div className="flex items-center pb-3 border-b border-gray-300">
                    <h3 className="text-slate-900 text-xl font-semibold flex-1 text-center">Order Summary</h3>
                    <svg id="closeIcon" xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 ml-2 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500" viewBox="0 0 320.591 320.591">
                      <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" data-original="#000000" />
                      <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" data-original="#000000" />
                    </svg>
                  </div>
                  <div className="my-6">
                    <p className="text-slate-600 text-2xl text-center font-bold leading-relaxed">Order Placed Successfully...</p>
                    <img width={'150px'} className=' m-auto mt-4' src="https://th.bing.com/th/id/R.b06d686ce26a343b0210c0734a3e476b?rik=VqkDvvMjrKXeQA&riu=http%3a%2f%2fvvbuitenpost.nl%2fwp-content%2fuploads%2f2020%2f08%2f1200px-Check_green_icon.svg_.png&ehk=E6vz6UhdAPMLo28ia8J9KGIV6krXnRfv26BZu3nG1dA%3d&risl=&pid=ImgRaw&r=0" alt="" />
                  </div>
                  <div className="border-t border-gray-300 pt-6 flex justify-end gap-4">
                    <button type="button" className="px-4 py-2 rounded-lg text-white text-sm font-medium border-none outline-none tracking-wide bg-blue-600 hover:bg-blue-700 active:bg-blue-600">OK</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )
      }

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
              <div key={product._id || index} className="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50">
                <div className="md:w-4/12 2xl:w-1/4 w-full">
                  <img src={product.image} alt={product.name} className="h-full object-center object-cover md:block hidden" />
                  <img src={product.image} alt={product.name} className="md:hidden w-full h-full object-center object-cover" />
                </div>
                <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                  <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">SKU: {product._id}</p>
                  <div className="flex items-center justify-between w-full">
                    <p className="text-base font-black leading-none text-gray-800">{product.name}</p>
                    <select value={item.quantity} className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none" disabled>
                      {[1, 2, 3, 4, 5].map(q => (
                        <option key={q}>{q.toString().padStart(2, '0')}</option>
                      ))}
                    </select>
                  </div>
                  <p className="text-xs leading-3 text-gray-600 pt-2">Category: {product.category || 'N/A'}</p>
                  <p className="text-xs leading-3 text-gray-600 py-4">Description: {product.description}</p>
                  <p className="w-96 text-xs leading-3 text-gray-600">ID: {product._id}</p>
                  <div className="flex items-center justify-between pt-5">
                    <div className="flex items-center">
                      <p className="text-xs leading-3 underline text-gray-800 cursor-pointer">Add to favorites</p>
                      <button
                        className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer"
                        onClick={() => handleRemove(product?._id)}
                      >
                        Remove
                      </button>
                    </div>
                    <p className="text-base font-black leading-none text-gray-800">
                      ₹{product.price * item.quantity}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          <Link to={'/'} className="flex font-semibold text-indigo-600 text-sm mt-10">
            <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059
              c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373
              24.569 0 33.941l86.059 86.059c15.119 15.119 40.971
              4.411 40.971-16.971V296z" />
            </svg>
            Continue Shopping
          </Link>
        </div>

        {/* RIGHT SIDE - SUMMARY */}
        <div id="summary" className="w-full sm:w-1/4 md:w-1/2 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">Items {cart.items.length}</span>
            <span className="font-semibold text-sm">₹{getTotal()}</span>
          </div>
          <div>
            <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
            <select className="block p-2 text-gray-600 w-full text-sm">
              <option>Standard shipping - ₹50.00</option>
            </select>
          </div>

          {/* Email and Mobile Inputs */}
          <div className="py-5">
            <label className="font-semibold inline-block mb-2 text-sm uppercase">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="p-2 text-sm w-full border"
            />
          </div>
          <div className="pb-5">
            <label className="font-semibold inline-block mb-2 text-sm uppercase">Mobile</label>
            <input
              type="text"
              placeholder="Enter your mobile number"
              value={mobile}
              onChange={e => setMobile(e.target.value)}
              className="p-2 text-sm w-full border"
            />
          </div>
          <div className="pb-5">
            <label className="font-semibold inline-block mb-2 text-sm uppercase">Address</label>
            <input
              type="text"
              placeholder="Enter your Address with Pincode"
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="p-2 text-sm w-full border"
            />
          </div>

          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>₹{getTotal() + 50}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
