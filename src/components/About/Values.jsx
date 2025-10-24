import { ShieldCheck, Truck, Heart, Sparkles } from "lucide-react";

const Values = () => {
  const values = [
    {
      icon: <ShieldCheck className="w-10 h-10 text-blue-600" />,
      title: "Quality & Trust",
      desc: "We only partner with brands that meet our strict quality standards.",
    },
    {
      icon: <Truck className="w-10 h-10 text-green-600" />,
      title: "Fast Shipping",
      desc: "Enjoy quick and reliable delivery straight to your doorstep.",
    },
    {
      icon: <Heart className="w-10 h-10 text-pink-600" />,
      title: "Customer Care",
      desc: "We’re always here to help with any questions or concerns.",
    },
    {
      icon: <Sparkles className="w-10 h-10 text-yellow-500" />,
      title: "Stylish Selections",
      desc: "Discover products that bring style and joy into your life.",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-800">Our Values</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <div
              key={i}
              className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition"
            >
              <div className="flex justify-center mb-4">{v.icon}</div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800">
                {v.title}
              </h3>
              <p className="text-gray-600 text-sm">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;