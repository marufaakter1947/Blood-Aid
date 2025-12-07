import React from "react";
import AboutBg from "../../assets/images/about-bg.jpeg";
import BloodDriveStory from "../../Component/BloodDriveStory/BloodDriveStory";

const About = () => {
  return (
    <div className="pt-15">
        <section
      className="relative min-h-[70vh] mx-4 rounded-xl overflow-hidden bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url(${AboutBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <div className="max-w-xl text-left">
          <h1 className="text-4xl md:text-3xl font-bold text-white leading-tight">
            About BloodAid
          </h1>

          <p className="mt-4 text-lg text-gray-200">
            BloodAid is dedicated to connecting lifesaving donors with those in need.
            We believe a simple act of kindness can save countless lives.
          </p>

          <p className="mt-3 text-gray-300">
            Our mission is to build a trusted, fast, and community-powered blood
            donation platform for everyone.
          </p>
        </div>
      </div>
    </section>
    <BloodDriveStory></BloodDriveStory>
    </div>

    
  );
};

export default About;
