import { useState } from "react";

const faqs = [
  {
    question: "Is BloodAid completely free to use?",
    answer:
      "Yes, BloodAid is 100% free. Anyone can search for donors, request blood, and register as a donor without any cost.",
  },
  {
    question: "How can I find blood donors on BloodAid?",
    answer:
      "You can easily find donors by using the Search Donor feature. Filter by blood group and location to quickly connect with available donors near you.",
  },
  {
    question: "Is my personal data secure?",
    answer:
      "Yes. We prioritize user privacy and data security. Your personal information is protected and is only used to provide blood donation-related services.",
  },
  {
    question: "How does the funding system work?",
    answer:
      "The funding section allows users to financially support blood donation campaigns and emergency patients. All funds are intended to help cover medical and operational needs.",
  },
  {
    question: "Who can become a blood donor?",
    answer:
      "Anyone who is healthy, meets the age requirements, and follows medical guidelines can register as a blood donor on BloodAid.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className=" pb-10">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-red-600 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">
            Here are some common questions about BloodAid and how it works.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md border">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <span className="font-semibold text-gray-800">
                  {faq.question}
                </span>
                <span className="text-2xl text-red-600">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>

              {activeIndex === index && (
                <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions? Feel free to contact our support team.
          </p>
          <a
            href="#contact"
            className="inline-block   bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
