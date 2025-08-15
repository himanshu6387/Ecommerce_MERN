import React, { useContext, useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function UserDashboard() {
  const [products, setProducts] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({}); // { productId: "M" }
  const navigate = useNavigate();
  const { search } = useContext(AuthContext);

  useEffect(() => {
    API.get("/products").then((res) => setProducts(res.data.products));
  }, []);

  const filteredData = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const addToCart = async (product) => {
    if (
      product.category?.toLowerCase() === "clothes" &&
      !selectedSizes[product._id]
    ) {
      toast.error("Please select a size before adding to cart");
      return;
    }

    try {
      await API.post("/cart", {
        productId: product._id,
        quantity: 1,
        size: selectedSizes[product._id] || null, // send size if selected
      });
      toast.success(
        `Added to cart ${selectedSizes[product._id] ? `(${selectedSizes[product._id]})` : ""}`
      );
      navigate("/cart");
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add to cart");
    }
  };

  return (
    <div className="px-10">
      <section
        id="Products"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-10 mb-5 max-w-[1800px] mx-auto w-full"
      >
        {filteredData.map((ele) => (
          <div
            key={ele._id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 border border-gray-100 w-full relative"
          >
            {/* Heart Icon */}
            <button
              className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white shadow-md"
              title="Add to Wishlist"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="red"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.015-4.5-4.5-4.5-1.74 0-3.245 1.004-4 2.45-.755-1.446-2.26-2.45-4-2.45C6.015 3.75 4 5.765 4 8.25c0 5.25 8 9.75 8 9.75s8-4.5 8-9.75z"
                />
              </svg>
            </button>

            <img
              src={ele.image}
              alt={ele.name}
              className="h-60 w-full object-cover"
            />

            <div className="p-4 flex flex-col h-full">
              <span className="text-gray-500 uppercase text-xs mb-1 tracking-wide">
                {ele.description}
              </span>
              <h3 className="text-lg font-semibold text-gray-900 truncate capitalize">
                {ele.name}
              </h3>

              {/* Sizes for clothes */}
              {ele.category?.toLowerCase() === "clothes" && (
                <div className="flex gap-2 mt-3">
                  {["S", "M", "L", "XL"].map((size) => (
                    <span
                      key={size}
                      onClick={() => handleSizeSelect(ele._id, size)}
                      className={`w-8 h-8 flex items-center justify-center rounded-full border text-sm font-medium cursor-pointer transition-colors ${
                        selectedSizes[ele._id] === size
                          ? "bg-green-500 text-white border-green-500"
                          : "border-gray-300 text-gray-700 hover:bg-green-100 hover:border-green-400"
                      }`}
                    >
                      {size}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center mt-3">
                <p className="text-lg font-bold text-green-600">₹{ele.price}</p>
                <del className="ml-2 text-gray-400 text-sm">₹199</del>

                <button
                  onClick={() => addToCart(ele)}
                  className="ml-auto p-2 rounded-full bg-green-100 hover:bg-green-200 text-green-600 transition-colors duration-200"
                  title="Add to Cart"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    fill="currentColor"
                    className="bi bi-bag-plus"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                    />
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
