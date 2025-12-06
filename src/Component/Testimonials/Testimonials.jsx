import React from 'react';
import donorImage from "../../assets/images/testimonial.png"

const testimonials = [
  {
    name: 'Rebecca Sovine',
    role: 'Blood Recipient',
    quote: 'A Gift of Life When I Needed It Most',
   description: 'Thanks to the generous donors, I received the blood I needed during a critical time. Their kindness gave me another chance at life. I will always be grateful for their selfless act, which brought hope and strength to my family and me. Every donation truly makes a difference, and their generosity inspired me to help others whenever I can. This experience has shown me the true power of community and compassion.'
,

    image:
      'https://images.unsplash.com/photo-1607746882042-944635dfe10e?crop=faces&fit=crop&w=64&h=64', // replace with real image if available
    bgColor: 'bg-red-600',
    textColor: 'text-white',
  },
  {
    name: 'Edward Collin',
    role: 'Regular Blood Donor',
    quote: 'A Simple Act, A Life Saved',
    description:
      'Donating blood is easy and rewarding. Knowing that my donation could save someone’s life motivates me to give regularly.',
    image:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?crop=faces&fit=crop&w=64&h=64', // replace with real image if available
    bgColor: 'bg-white',
    textColor: 'text-gray-900',
  },
];

const Testimonials = () => {
  return (
    <section className=" py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <p className="text-red-600 font-bold mb-2 text-3xl md:text-4xl text-center">Testimonials</p>
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
          Lives Changed: Testimonials from Donors & Survivors
        </h2>
        <p className="text-gray-600 text-center mb-12">
          Real stories from people whose lives were impacted by blood donations—both donors and recipients.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div className={`rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-6 ${testimonial.bgColor} ${testimonial.textColor}`}>
  <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full object-cover shrink-0" />
  <div className="flex-1">
    <h3 className="text-xl font-semibold">{testimonial.name}</h3>
    <p className="text-sm mb-2">{testimonial.role}</p>

    {testimonial.role.toLowerCase().includes("donor") && (
      <img src={donorImage} alt="Donor" className="mb-2" />
    )}

    <h4 className="font-medium mb-2">&quot;{testimonial.quote}&quot;</h4>
    <p className="text-sm">{testimonial.description}</p>
  </div>
</div>

          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
