import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";
import { addToCart, fetchProducts } from "../Redux/productSlice";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { Heart } from "lucide-react";
import { addToFavorites, removeFromFavorites } from "../Redux/productSlice";
import Swal from "sweetalert2";

const Products = () => {
  const dispatch = useDispatch();
  const { items, loading, error, favorites } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

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

  return (
    <div>
      {error ? (
        <div className="container mx-auto px-4">
          <div className="text-center my-10">
            <h1 className="text-4xl font-bold">Featured Products</h1>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="text-xl text-red-500">Error: {error}</div>
          </div>
        </div>
      ) : loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <SyncLoader color="#36d7b7" size={15} />
        </div>
      ) : (
        <div className="container mx-auto py-4">
          <div className="items-center text-center my-10">
            <h1 className="text-4xl font-bold">Featured Products</h1>
            <h2 className="text-lg mt-4 text-gray-600">
              Discover our carefully curated collection of premium products
              designed to enhance your lifestyle
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 mdl:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((product) => {
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
        </div>
      )}
    </div>
  );
};

export default Products;
