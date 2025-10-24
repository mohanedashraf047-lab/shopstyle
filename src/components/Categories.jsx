import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  const categories = [
    {
      name: "Electronics",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Fashion",
      img: "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Home & Living",
      img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Sports",
      img: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const handleCategoryClick = (categoryName) => {
    // Navigate to shop page with search query
    navigate(`/shop?search=${encodeURIComponent(categoryName)}`);
  };

  return (
    <section className="container mx-auto my-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 font-serif">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => handleCategoryClick(cat.name)}
            className="relative group cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-lg transition duration-300"
          >
            <img
              src={cat.img}
              alt={cat.name}
              className="object-cover h-56 w-full group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <h3 className="text-white text-xl font-semibold tracking-wide">
                {cat.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
