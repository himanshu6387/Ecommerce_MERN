import React, { useContext, useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function UserDashboard() {
  const [products, setProducts] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false); // NEW: For mobile sidebar toggle
  const navigate = useNavigate();
  const { search } = useContext(AuthContext);

  useEffect(() => {
    API.get("/products").then((res) => setProducts(res.data.products || []));
  }, []);

  const filteredData = products.filter((p) => {
    const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory
      ? p.category?.toLowerCase() === selectedCategory.toLowerCase()
      : true;
    return matchesSearch && matchesCategory;
  });

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
        size: selectedSizes[product._id] || null,
      });
      toast.success(
        `Added to cart ${selectedSizes[product._id] ? `(${selectedSizes[product._id]})` : ""
        }`
      );
      navigate("/cart");
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add to cart");
    }
  };

  return (
    <div className="px-6 md:px-12 mt-6 max-w-[1800px] mx-auto">

      {/* Mobile filter toggle button */}
      <div className="flex items-center justify-between mb-4 md:hidden">
        <p className="text-sm text-gray-600">
          Showing all {filteredData.length} results
        </p>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 border border-gray-300 rounded hover:bg-gray-100"
        >
          ☰ Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* LEFT SIDEBAR */}
        <aside
          className={`col-span-1 space-y-6 bg-white p-4 rounded shadow-md md:shadow-none md:p-0 
            md:block ${sidebarOpen ? "block" : "hidden"}`}
        >
          {/* Price Filter */}
          <div>
            <h3 className="font-semibold mb-2">Price</h3>
            <input
              type="range"
              min="0"
              max="1000"
              defaultValue="500"
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>₹0</span>
              <span>₹1000</span>
            </div>
          </div>

          {/* Checkboxes */}
          <div>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-purple-600" /> Featured
              products
            </label>
            <label className="flex items-center gap-2 mt-2">
              <input type="checkbox" className="accent-purple-600" /> In stock
            </label>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-2">Categories</h3>
            <ul className="space-y-1 text-gray-700 text-sm cursor-pointer">
              {[
                { label: "All", value: "" },
                { label: "Bags", value: "Bags" },
                { label: "Bottle", value: "Bottle" },
                { label: "Calendars", value: "Calendars" },
                { label: "Combo", value: "Combo" },
                { label: "Flowers", value: "Flowers" },
                { label: "Keychain", value: "Keychain" },
                { label: "Lamp", value: "Lamp" },
                { label: "Mugs", value: "Mugs" },
                { label: "Name Plates", value: "Name Plates" },
                { label: "Photo Frames", value: "Photo Frames" },
                { label: "Printed Cushion", value: "Printed Cushion" },
              ].map((cat) => (
                <li
                  key={cat.label}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`hover:text-purple-600 ${selectedCategory === cat.value
                    ? "font-semibold text-purple-700"
                    : ""
                    }`}
                >
                  {cat.label}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="col-span-3">
          {/* Sorting + View Toggle */}
          <div className="hidden md:flex items-center justify-between mb-6">
            <p className="text-sm text-gray-600">
              Showing all {filteredData.length} results
            </p>
            <div className="flex items-center gap-4">
              <select className="border border-gray-300 text-sm rounded px-2 py-1">
                <option>Default sorting</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
              <div className="flex gap-2">
                <button className="p-1 border border-gray-300 rounded hover:bg-gray-100">
                  ⬜⬜
                </button>
                <button className="p-1 border border-gray-300 rounded hover:bg-gray-100">
                  📄
                </button>
              </div>
            </div>
          </div>

          {/* PRODUCT GRID */}
          {filteredData.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto mb-4 h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m2 8H7a2 2 0 01-2-2V7a2 2 0 012-2h4l2-2h4a2 2 0 012 2v14a2 2 0 01-2 2z" />
              </svg>
              <p className="text-lg font-medium">No products found</p>
              <p className="text-sm text-gray-400">
                Try adjusting your search or selecting another category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData.map((ele) => (
                <div
                  key={ele._id}
                  className="border border-gray-200 rounded overflow-hidden bg-white"
                >
                  <img
                    src={ele.image}
                    alt={ele.name}
                    className="h-60 w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-1">
                      {ele.name}
                    </h3>
                    <p className="text-purple-700 font-semibold text-base">
                      ₹{ele.price}
                    </p>

                    {/* Sizes */}
                    {ele.category?.toLowerCase() === "clothes" && (
                      <div className="flex gap-2 mt-2">
                        {["S", "M", "L", "XL"].map((size) => (
                          <span
                            key={size}
                            onClick={() => handleSizeSelect(ele._id, size)}
                            className={`w-8 h-8 flex items-center justify-center rounded-full border text-xs font-medium cursor-pointer ${selectedSizes[ele._id] === size
                                ? "bg-purple-600 text-white border-purple-600"
                                : "border-gray-300 hover:bg-purple-100"
                              }`}
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Add to cart */}
                    <button
                      onClick={() => addToCart(ele)}
                      className="mt-4 w-full py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
