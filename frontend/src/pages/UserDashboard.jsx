import React, { useContext, useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function UserDashboard() {
  const [products, setProducts] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { search, wishlist, toggleWishlist, setCarousel } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    API.get("/products")
      .then((res) => setProducts(res.data.products || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
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
    if (product.category?.toLowerCase() === "clothes" && !selectedSizes[product._id]) {
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
        `Added to cart ${selectedSizes[product._id] ? `(${selectedSizes[product._id]})` : ""}`
      );
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Please!! Login");
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
            <input type="range" min="0" max="1000" defaultValue="500" className="w-full" />
            <div className="flex justify-between text-sm text-gray-500">
              <span>₹0</span>
              <span>₹1000</span>
            </div>
          </div>

          {/* Checkboxes */}
          <div>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-purple-600" /> Featured products
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
            </div>
          </div>

          {/* PRODUCT GRID */}
          {loading ? (
            <div className="flex justify-center items-center flex-col py-40">
              <img
                src="https://vmsmobile.azurewebsites.net/images/Spinner-3.gif"
                alt="Loading..."
                className="h-20 w-20"
              />
              <p className=" text-center mt-3 text-green-600 font-semibold">Product Loading...</p>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
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
                  className="border border-gray-200 rounded overflow-hidden bg-white relative"
                >
                  {/* Heart Icon */}
                  <button
                    onClick={() => toggleWishlist(ele)}
                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 z-10"
                  >
                    {wishlist.find((p) => p._id === ele._id) ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FaRegHeart className="text-gray-400" />
                    )}
                  </button>

                  <img src={ele.image} alt={ele.name} className="h-60 w-full object-cover" />
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-1">{ele.name}</h3>
                    <p className="text-purple-700 font-semibold text-base">₹{ele.price}</p>

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
