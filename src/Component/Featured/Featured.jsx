import { motion } from "framer-motion";

const features = [
  {
    title: "Save Lives",
    description:
      "Your blood donation can save multiple lives. Every drop counts in emergencies.",
    icon: (
      <svg
        className="w-10 h-10 text-red-600"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8c1.656 0 3-1.344 3-3S13.656 2 12 2 9 3.344 9 5s1.344 3 3 3zM12 14c-4 0-7 3-7 7h14c0-4-3-7-7-7z"
        />
      </svg>
    ),
  },
  {
    title: "Join as a Donor",
    description:
      "Register easily and start helping those in need. Your donation makes a difference.",
    icon: (
      <svg
        className="w-10 h-10 text-red-600"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4v16m8-8H4"
        />
      </svg>
    ),
  },
  {
    title: "Search Donors",
    description:
      "Quickly find registered donors in your area whenever blood is needed.",
    icon: (
      <svg
        className="w-10 h-10 text-red-600"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
  },
];

const Featured = () => {
  return (
    <section className="py-10 mx-4">
      <div className="max-w-6xl mx-auto bg-red-300 rounded-xl py-5  text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-red-600">
          Why BloodAid?
        </h2>
        <p className="mt-4 text-gray-600 text-lg">
          Our platform connects donors with those in urgent need. Learn how you can make a difference.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
            >
              <div className="flex items-center  justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-red-600 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
