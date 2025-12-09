import React from "react";
import EventsImage from "../../assets/images/Events-hero.jpg";
import EventImage1 from "../../assets/images/event1.webp"
import EventImage2 from "../../assets/images/Event2.jpg"


const Events = () => {
    const events = [
  {
  id: 1,
  title: "A Campus Blood Mission",
  date: "March 18, 2025",
  time: "09.00 AM - 5.30 PM",
  location: "Young School Hall",
  description:
    "A blood donation camp organized for students and faculty members to encourage voluntary blood donation and support patients in need.",
  image: EventImage1,
},
{
  id: 2,
  title: "Community Blood Donation Drive",
  date: "April 05, 2025",
  time: "10.00 AM - 4.00 PM",
  location: "Central Community Center",
  description:
    "A community-focused blood donation drive aimed at bringing local donors together to ensure a steady and safe blood supply for emergencies.",
  image: EventImage2,
},
];
  return (
    <div className="pt-15">
      <section
        className="relative min-h-[70vh] mx-4 rounded-xl overflow-hidden bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url(${EventsImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
          <div className="max-w-xl text-left">
            <h1 className="text-4xl md:text-3xl font-bold text-white leading-tight">
              BloodAid Events
            </h1>

            <p className="mt-4 text-lg text-gray-200">
              BloodAid regularly organizes blood donation camps, awareness
              programs, and community events to bring donors and patients
              together.
            </p>

            <p className="mt-3 text-gray-300">
              Through our events, we promote safe blood donation, encourage
              first-time donors, and ensure quick access to blood during
              emergencies.
            </p>
          </div>
        </div>
      </section>
      <section className="py-10 ">
  <div className="max-w-7xl mx-auto px-6">
    {/* Section Header */}
    <div className="text-center mb-10">
      <h2 className="text-red-600 font-bold mb-2 text-3xl md:text-4xl">
        Upcoming Events
      </h2>
      <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
        Join our upcoming blood donation events and be a part of a life-saving mission.
      </p>
    </div>

    {/* Event Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {events.map((event) => (
        <div
          key={event.id}
          className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
        >
          {/* Image */}
          <img
            src={event.image}
            alt={event.title}
            className="h-[180px] w-full object-cover"
          />

          {/* Content */}
          <div className="p-5 flex flex-col grow">
            <h3 className="text-lg font-semibold text-gray-800">
              {event.title}
            </h3>

            <p className="mt-2 text-sm text-gray-500">{event.date}</p>
            <p className="text-sm text-gray-500">{event.time}</p>
            <p className="text-sm text-gray-500 mb-2">{event.location}</p>

            <p className="text-sm text-gray-600 grow">
              {event.description}
            </p>

            
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


    </div>
  );
};

export default Events;
