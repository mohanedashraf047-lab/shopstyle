const OurStory = () => (
  <section className="container mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
    <img
      src="https://images.unsplash.com/photo-1542831371-d531d36971e6?auto=format&fit=crop&w=900&q=80"
      alt="Our story"
      className="rounded-lg shadow-lg"
    />
    <div>
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Story</h2>
      <p className="text-gray-600 leading-7 mb-4">
        ShopStyle started with a simple idea — to make shopping for quality,
        stylish products accessible to everyone. From home decor to fashion and
        electronics, we bring together the best items from trusted brands all in
        one place.
      </p>
      <p className="text-gray-600 leading-7">
        What began as a small team of passionate creators has grown into a
        trusted destination for thousands of happy customers around the world.
      </p>
    </div>
  </section>
);

export default OurStory;
