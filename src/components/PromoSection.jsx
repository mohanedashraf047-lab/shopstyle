import { useNavigate } from "react-router-dom";

const PromoSection = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/shop");
  };

  return (
    <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-16 mt-20">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-4xl font-bold mb-4">Big Sale This Week!</h2>
        <p className="text-lg mb-6">
          Enjoy up to 50% off on selected categories. Don’t miss your chance to
          save big!
        </p>
        <button
          onClick={handleShopNow}
          className="bg-white text-indigo-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
        >
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default PromoSection;
