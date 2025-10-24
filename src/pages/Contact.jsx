import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="mt-10">
      {/* Hero Section */}
      <section className="bg-gray-100 py-20 text-center px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Have questions or need help? We’re here to assist you. Get in touch
          with our ShopStyle support team anytime.
        </p>
      </section>

      {/* Contact Info Cards */}
      <section className="container mx-auto px-6 py-16 grid md:grid-cols-3 gap-8 text-center">
        <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition">
          <Mail className="mx-auto text-blue-600 w-10 h-10 mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Email</h3>
          <p className="text-gray-600 text-sm">support@shopstyle.com</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition">
          <Phone className="mx-auto text-green-600 w-10 h-10 mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Phone</h3>
          <p className="text-gray-600 text-sm">+1 (555) 123-4567</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition">
          <MapPin className="mx-auto text-red-600 w-10 h-10 mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Location</h3>
          <p className="text-gray-600 text-sm">
            123 Fashion Ave, New York, USA
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="container mx-auto px-6 py-16">
        <div className="bg-white shadow-md rounded-lg p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Send Us a Message
          </h2>
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="Your Name"
              className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              className="md:col-span-2 border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            ></textarea>
            <button
              type="submit"
              className="md:col-span-2 bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Optional Map */}
      <section className="w-full h-80 mt-10">
        <iframe
          title="ShopStyle Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.798847516984!2d-74.006015!3d40.712775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316bbdf0ff%3A0xc80b8f06e177fe62!2sFashion%20Ave!5e0!3m2!1sen!2sus!4v1708200000000!5m2!1sen!2sus"
          width="100%"
          height="100%"
          allowFullScreen=""
          loading="lazy"
          className="border-0"
        ></iframe>
      </section>
    </div>
  );
};

export default Contact;
