const Testimonials = () => {
  const reviews = [
    {
      name: "Sarah Johnson",
      comment: "Great quality and fast delivery! ShopStyle is my go-to store.",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "David Lee",
      comment: "Excellent service and amazing product variety.",
      img: "https://randomuser.me/api/portraits/men/46.jpg",
    },
    {
      name: "Emma Brown",
      comment: "I love the new arrivals! Everything feels premium.",
      img: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ];

  return (
    <section className="container mx-auto my-20 px-4">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
        What Our Customers Say
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {reviews.map((r, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center"
          >
            <img
              src={r.img}
              alt={r.name}
              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
            />
            <p className="text-gray-600 italic mb-3">“{r.comment}”</p>
            <h3 className="font-semibold text-gray-800">{r.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
