import React from "react";
import ServicesImage from "../../assets/images/services-image.jpg";

const ServicesContent = () => {
  return (
    <div className="mx-4  my-10">
      <div className="w-full bg-gray-300 py-10 px-4 grid md:grid-cols-2 gap-8 items-center rounded-xl">
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-7 text-center">
            <div>
              <h2 className="text-4xl font-bold">75+</h2>
              <p className="text-red-600 font-semibold">Blood Cooperations</p>
            </div>
            <div>
              <h2 className="text-4xl font-bold">50+</h2>
              <p className="text-red-600 font-semibold">Expert Staff</p>
            </div>
            <div>
              <h2 className="text-4xl font-bold">330+</h2>
              <p className="text-red-600 font-semibold">Blood Donations</p>
            </div>
          </div>

          {/* Why We Do It */}
          <div className="bg-red-600 text-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-3">Why We Do It</h2>
            <p className="text-base leading-relaxed">
              Every 2 seconds, someone needs a blood transfusion. Yet, less than
              5% of eligible donors give blood. We’re here to bridge that gap,
              making donation simple, safe, and rewarding.
            </p>
          </div>
        </div>

        <div className="w-full md:w-10/12 lg:w-4/5 mx-auto h-40 md:h-[300px] lg:h-[300px]">
          <img
            src={ServicesImage}
            alt="Blood donation bag"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default ServicesContent;
