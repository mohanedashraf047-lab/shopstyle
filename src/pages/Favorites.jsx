import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Heart, X } from "lucide-react";
import Swal from "sweetalert2";
import {
  addToCart,
  removeFromFavorites,
  clearFavorites,
} from "../Redux/productSlice";

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.products.favorites);

  const handleRemove = (id) => {
    dispatch(removeFromFavorites(id));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));

    // ✅ Show success alert
    Swal.fire({
      icon: "success",
      title: "Added to Cart!",
      text: `${product.title} has been added to your cart successfully.`,
      showConfirmButton: false,
      timer: 1800,
      timerProgressBar: true,
    });
  };

  return (
    <>
      <div className="container mx-auto px-6 py-12 mt-24">
        <h1 className="text-3xl font-bold mb-6 text-center">My Favorites ❤️</h1>

        {favorites.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-64 bg-gray-100 rounded-lg shadow-inner">
            <Heart className="w-20 h-20 text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg mb-4">
              Your favorites list is empty.
            </p>
            <Link to="/">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition">
                Browse Products
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 relative"
                >
                  {/* ❌ Remove from favorites */}
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* 🖼 Product image */}
                  <div className="h-48 bg-gray-50 flex justify-center items-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-h-40 object-contain hover:scale-105 transition duration-300"
                    />
                  </div>

                  {/* 📦 Product info */}
                  <div className="p-4 text-center">
                    <h2 className="text-md font-semibold line-clamp-2 mb-2">
                      {item.title}
                    </h2>
                    <p className="text-lg font-bold text-green-600 mb-3">
                      ${item.price}
                    </p>

                    {/* 🛒 Add to cart */}
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 🔴 Clear all favorites */}
            <div className="text-center mt-10">
              <button
                onClick={() => dispatch(clearFavorites())}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-semibold transition"
              >
                Clear All Favorites
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Favorites;
