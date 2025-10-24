import { ShoppingCart, X } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  ClearCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  setQuantity,
} from "../Redux/productSlice";
import Swal from "sweetalert2";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.products.cart);
  const userInfo = useSelector((state) => state.products.userInfo);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const calculateTotal = () => {
    return products
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleOrder = () => {
    if (!userInfo) {
      Swal.fire({
        icon: "warning",
        title: "Please Sign In",
        text: "You must sign in before placing an order.",
        confirmButtonText: "Go to Sign In",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/sign");
        }
      });
    } else {
      navigate("/payment");
    }
  };

  return (
    <div className="w-2/4 mx-auto rounded-lg mt-28">
      {products.length > 0 ? (
        <div>
          <h1 className="text-3xl font-bold font-serif mb-2">Shopping Cart</h1>
          <p className="font-serif font-medium text-gray-500 mb-4">
            {products.length} items in your cart
          </p>

          {products.map((item) => (
            <div
              key={item.id}
              className="container mx-auto flex gap-5 bg-gray-200 p-5 justify-between items-center border-b border-gray-300"
            >
              <div className="flex gap-7">
                <div className="flex justify-center items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-28 object-contain"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <h1 className="text-xl font-bold font-serif mb-2">
                    {item.title}
                  </h1>
                  <h2 className="text-lg font-bold font-mono mb-2 text-blue-500">
                    ${item.price}
                  </h2>
                </div>
              </div>

              <div className="flex flex-col relative">
                <div
                  className="absolute bottom-16 right-0 rounded-full w-6 h-6 flex justify-center items-center cursor-pointer hover:bg-red-500 hover:shadow-lg"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  <X />
                </div>

                <div className="flex gap-2 mb-3 mt-3 text-center items-center">
                  <button
                    onClick={() => dispatch(decrementQuantity(item.id))}
                    className="rounded-full bg-gray-400 hover:bg-gray-600 text-white w-8 mx-3 font-bold flex justify-center items-center"
                  >
                    -
                  </button>

                  <input
                    className="w-12 text-center rounded-3xl outline-none px-1 py-0.5 font-semibold"
                    value={item.quantity}
                    onChange={(e) =>
                      dispatch(
                        setQuantity({
                          id: item.id,
                          quantity: parseInt(e.target.value),
                        })
                      )
                    }
                  />

                  <button
                    onClick={() => dispatch(incrementQuantity(item.id))}
                    className="rounded-full bg-gray-400 hover:bg-gray-600 text-white w-8 mx-3 font-bold flex justify-center items-center"
                  >
                    +
                  </button>

                  <p className="font-semibold text-black">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Cart Summary */}
          <div className="p-6 border-t border-gray-200 rounded-b-lg bg-white mt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-indigo-600">
                ${calculateTotal()}
              </span>
            </div>

            <button
              onClick={handleOrder}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700"
            >
              Order Now
            </button>

            <button
              onClick={() => dispatch(ClearCart())}
              className="w-full mt-4 bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700"
            >
              Delete All Products
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold font-serif mb-2">Shopping Cart</h1>
          <p className="font-serif">0 items in your cart</p>
          <div className="mt-5 text-center flex flex-col justify-center items-center h-60 bg-zinc-100 shadow-md hover:shadow-xl">
            <ShoppingCart className="w-32 h-24 opacity-45 mb-4" />
            <h1 className="text-gray-700 text-2xl">
              <i className="font-semibold font-serif">Your cart is empty</i>{" "}
              <Link to="/">
                <button className="rounded-lg bg-blue-600 hover:bg-blue-700 text-xl text-white px-4 py-2 font-mono">
                  Add Products Now
                </button>
              </Link>
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
