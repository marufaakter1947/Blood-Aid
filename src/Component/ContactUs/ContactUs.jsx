import { useState } from 'react';
import contactBg from '../../assets/images/contact.jpg';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('Message sent!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section
  className="relative min-h-[70vh] bg-cover bg-center bg-no-repeat  mx-4 rounded-xl"
  style={{ backgroundImage: `url(${contactBg})` }}
>
  <div className="absolute inset-0 bg-black/60 z-10"></div>

  <div className="relative z-20 max-w-6xl mx-auto px-6 py-6 text-white">
    <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-semibold mb-4">Get in touch</h3>
            <p className="mb-4 text-gray-200">
              For inquiries, support, or donation-related questions, feel free to reach out to us:
            </p>
            <p className="text-gray-100 font-semibold">📞 Phone: +880 1234 567890</p>
            <p className="text-gray-100 font-semibold mt-2">✉️ Email: info@bloodaid.com</p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-white text-black p-8 rounded shadow-md space-y-4"
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="3"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
