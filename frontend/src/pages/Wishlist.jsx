import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useContext(AuthContext);

  if (wishlist.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <h2 className="text-2xl font-semibold">Your wishlist is empty</h2>
        <p className="mt-2">Add products you like by clicking the heart icon.</p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 md:px-12 mt-6 max-w-[1800px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        My Wishlist ({wishlist.length})
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((ele) => (
          <div
            key={ele._id}
            className="relative border border-gray-200 rounded-lg overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Heart Icon */}
            <button
              onClick={() => {
                toggleWishlist(ele);
                toast.success("Removed from wishlist");
              }}
              className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 z-10"
            >
              <FaHeart className="text-red-500" />
            </button>

            <img
              src={ele.image}
              alt={ele.name}
              className="h-56 sm:h-60 w-full object-cover"
            />
            <div className="p-4 flex flex-col justify-between h-32">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">{ele.name}</h3>
                <p className="text-purple-700 font-semibold text-base">₹{ele.price}</p>
              </div>
              <button
                onClick={() => {
                  toggleWishlist(ele);
                  toast.success("Removed from wishlist");
                }}
                className="mt-2 w-full py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600"
              >
                Remove from Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
