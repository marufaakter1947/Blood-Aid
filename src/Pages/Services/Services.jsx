import React from 'react';
import ServicesImage from '../../assets/images/services-image.jpg'
import ServicesHeroImg from '../../assets/images/services-Hero.jpg'

const Services = () => {
    return (
        <div className='mt-11'>
            <section
                  className="relative min-h-[80vh] mx-4 rounded-xl overflow-hidden bg-cover bg-center flex items-center"
                  style={{ backgroundImage: `url(${ServicesHeroImg})` }}
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50"></div>
            
                
                  <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex justify-end">
    <div className="max-w-xl text-right">
      <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
        BloodAid Services
      </h1>

      <p className="mt-4 text-lg text-gray-200">
        BloodAid provides a complete range of services to ensure safe and timely
        blood donation. From donor registration to blood delivery, we make the process
        smooth and reliable.
      </p>

      <p className="mt-3 text-gray-300">
        Our services include:
      </p>

      <ul className="mt-2 list-disc list-inside text-gray-300">
        <li>Donor Registration and Verification</li>
        <li>Blood Donation Drives</li>
        <li>Emergency Blood Request Matching</li>
        <li>Community Awareness Programs</li>
        <li>24/7 Support for Donors and Recipients</li>
      </ul>
    </div>
  </div>

                </section>
        </div>
    );
};

export default Services;