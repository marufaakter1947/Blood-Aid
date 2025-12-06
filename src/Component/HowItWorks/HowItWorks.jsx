import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    {
      id: '01',
      title: 'Register & Health Check',
      description:
        'Sign up online and complete a quick health screening to ensure you are eligible to donate blood safely.',
    },
    {
      id: '02',
      title: 'Blood Donation',
      description:
        'Visit our donation center at your scheduled time and donate blood in a safe and comfortable environment.',
    },
    {
      id: '03',
      title: 'Rest & Save Lives',
      description:
        'Take a short rest after donating, enjoy refreshments, and know that your contribution can save multiple lives.',
    },
  ];

  return (
    <section className="bg-gray-900 text-white py-10 px-4 mt-10">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-red-600 font-bold mb-2 text-3xl md:text-4xl">How It Works</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Giving Blood Made Easy
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto mb-12">
          Donating blood is simple and impactful. Follow these steps to make a difference in someone's life today.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="bg-gray-800 border border-gray-700 rounded-lg p-6 flex flex-col gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-red-600 w-12 h-12 flex items-center justify-center rounded-lg text-white text-xl font-bold">
                {step.id}
              </div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-gray-300 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
