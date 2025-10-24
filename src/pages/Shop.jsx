import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";
import {
  addToCart,
  fetchProducts,
  addToFavorites,
  removeFromFavorites,
} from "../Redux/productSlice";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { Heart } from "lucide-react";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

const Shop = () => {
  const dispatch = useDispatch();
  const { items, loading, error, favorites } = useSelector(
    (state) => state.products
  );
  const location = useLocation();
  const [query, setQuery] = useState("");

  // Fetch products on first load
  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  // Update query whenever the URL search changes
  useEffect(() => {
    const searchParam =
      new URLSearchParams(location.search).get("search")?.toLowerCase() || "";
    setQuery(searchParam);
  }, [location.search]);

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    Swal.fire({
      icon: "success",
      title: "Added to Cart!",
      text: `${product.title} has been added to your cart.`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleToggleFavorite = (product) => {
    const isFavorite = favorites.some((fav) => fav.id === product.id);
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  // Filter products based on search query (title, category, or type)
  const filteredItems = items.filter(
    (product) =>
      product.title.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      (product.type && product.type.toLowerCase().includes(query))
  );

  return (
    <div className="container mx-auto py-4 mt-14">
      <div className="text-center my-10">
        <h1 className="text-4xl font-bold">Shop All Products</h1>
        {query && (
          <h2 className="text-lg mt-4 text-gray-600">
            Showing results for "<span className="font-semibold">{query}</span>"
          </h2>
        )}
        {!query && (
          <h2 className="text-lg mt-4 text-gray-600">
            Browse through all categories and find your perfect product.
          </h2>
        )}
      </div>

      {error ? (
        <div className="text-center text-red-500 text-xl">{error}</div>
      ) : loading ? (
        <div className="flex justify-center items-center h-64">
          <SyncLoader color="#36d7b7" size={15} />
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center text-gray-500 text-xl mt-10 h-[220px]">
          No products found for "{query}"
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {filteredItems.map((product) => {
            const isFavorite = favorites.some((fav) => fav.id === product.id);
            return (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden relative hover:shadow-lg transition duration-300 group"
              >
                {/* Favorite Heart */}
                <div
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 cursor-pointer opacity-0 group-hover:opacity-100 transition duration-300"
                  onClick={() => handleToggleFavorite(product)}
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isFavorite ? "fill-red-500" : "fill-none"
                    }`}
                  />
                </div>

                <div className="h-48 overflow-hidden flex items-center justify-center bg-white">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain p-4 hover:scale-110 transition duration-300 cursor-pointer"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-sm font-semibold mb-2 line-clamp-2 h-14 text-green-700 mt-3">
                    {product.title}
                  </h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-green-600">
                      ${product.price}
                    </span>
                    <div className="flex items-center">
                      <MdOutlineStarPurple500 className="text-yellow-400" />
                      <span className="text-sm text-gray-600 ml-1">
                        {product.rating?.rate} ({product.rating?.count})
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mb-3 capitalize">
                    {product.category}
                  </p>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-blue-600 rounded px-4 py-2 w-full transition duration-300 hover:bg-blue-800"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Shop;
