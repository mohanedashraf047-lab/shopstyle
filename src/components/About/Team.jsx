const Team = () => {
  const members = [
    {
      name: "Layla Hassan",
      role: "Founder & CEO",
      img: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "Omar Khaled",
      role: "Head of Design",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Sara Youssef",
      role: "Marketing Manager",
      img: "https://randomuser.me/api/portraits/women/56.jpg",
    },
  ];

  return (
    <section className="container mx-auto py-16 px-6 text-center">
      <h2 className="text-3xl font-bold mb-10 text-gray-800">Meet Our Team</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {members.map((m) => (
          <div key={m.name} className="bg-white p-6 rounded-lg shadow-md">
            <img
              src={m.img}
              alt={m.name}
              className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="font-semibold text-lg text-gray-800">{m.name}</h3>
            <p className="text-gray-500 text-sm">{m.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;