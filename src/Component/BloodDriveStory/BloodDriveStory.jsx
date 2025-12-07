import { FaPhoneAlt, FaHeart } from "react-icons/fa";

const BloodDriveStory = () => {
  return (
    <section className="py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-red-600 font-bold mb-2 text-3xl md:text-4xl text-center">
          Dedicated to Life, <br /> The Story of Our Blood Drive Initiative
        </h2>

        {/* Description */}
        <p className="mt-6 text-gray-600 text-lg leading-relaxed text-center">
          BloodAid was created with a single mission — to save lives by making blood donation
          accessible, fast, and reliable. Through community-driven blood drives, we connect
          compassionate donors with patients in urgent need, ensuring no life is lost due to
          shortage.
        </p>

        {/* Content Box */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Card */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-2xl font-semibold text-gray-900">
              Have a Question?
            </h3>

            <p className="mt-3 text-gray-600">
              Our support team is always ready to guide donors and recipients through
              the blood donation process.
            </p>

            <div className="mt-6 flex items-center gap-4">
              <div className="bg-red-600 text-white p-3 rounded-lg">
                <FaPhoneAlt />
              </div>

              <div>
                <p className="text-sm text-gray-500">Call Us</p>
                <p className="font-semibold text-gray-900">+880 1765 432100</p>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="md:col-span-2 flex flex-col justify-between">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FaHeart className="text-red-600 mt-1" />
                <span className="text-gray-700">
                  Organizing regular blood drives to support hospitals and emergencies.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <FaHeart className="text-red-600 mt-1" />
                <span className="text-gray-700">
                  Building a verified donor network for fast and reliable response.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <FaHeart className="text-red-600 mt-1" />
                <span className="text-gray-700">
                  Raising awareness about the importance of voluntary blood donation.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <FaHeart className="text-red-600 mt-1" />
                <span className="text-gray-700">
                  Supporting patients and families during critical medical situations.
                </span>
              </li>
            </ul>

            <div className="mt-8">
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition">
                Discover More
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BloodDriveStory;
