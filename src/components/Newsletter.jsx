import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Newsletter = () => {
  const userInfo = useSelector((state) => state.products.userInfo);
  const navigate = useNavigate();

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!userInfo) {
      Swal.fire({
        title: "Please Sign In",
        text: "You need to sign in before subscribing to our newsletter.",
        icon: "info",
        confirmButtonText: "Go to Sign In",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/sign");
        }
      });
    } else {
      Swal.fire({
        title: "Subscribed Successfully 🎉",
        text: "You’ve been added to our newsletter list!",
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="bg-blue-600 py-16 px-4 sm:px-8 lg:px-16 text-white text-center mt-16">
      <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
      <p className="text-lg mb-6 text-gray-100">
        Stay updated with the latest collections, offers, and trends — straight
        to your inbox!
      </p>
      <form
        onSubmit={handleSubscribe}
        className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto"
      >
        <input
          type="email"
          placeholder="Enter your email"
          required
          className="w-full sm:w-2/3 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          type="submit"
          className="w-full sm:w-auto bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition duration-300"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
