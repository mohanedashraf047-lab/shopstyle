import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Payment = () => {
  const navigate = useNavigate();

  const handlePayment = (e) => {
    e.preventDefault();

    Swal.fire({
      icon: "success",
      title: "Payment Successful!",
      text: "Your order has been placed successfully.",
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
    }).then(() => {
      navigate("/"); // go back to home
    });
  };
  return (
    <>
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-center mb-10">
          Payment Details
        </h1>

        <form
          onSubmit={handlePayment}
          className="max-w-2xl mx-auto bg-white p-8 shadow-md rounded-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Full Name"
              className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Address"
              className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none md:col-span-2"
              required
            />
            <input
              type="text"
              placeholder="City"
              className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="ZIP / Postal Code"
              className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <h2 className="text-xl font-semibold mt-8 mb-4">
            Payment Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Card Number"
              className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Name on Card"
              className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Expiry Date (MM/YY)"
              className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="CVV"
              className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 mt-8 rounded-md font-semibold hover:bg-green-700 transition"
          >
            Confirm Payment
          </button>
        </form>
      </div>
    </>
  );
};

export default Payment;
