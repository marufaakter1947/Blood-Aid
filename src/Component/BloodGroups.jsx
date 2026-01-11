import { BiSolidDonateBlood } from "react-icons/bi";
import { BiSolidInjection } from "react-icons/bi";
import { MdOutlineEmergency } from "react-icons/md";
const bloodGroups = [
  { type: "A+", give: "A+, AB+", take: "A+, A-, O+, O-" },
  { type: "A-", give: "A+, A-, AB+, AB-", take: "A-, O-" },
  { type: "B+", give: "B+, AB+", take: "B+, B-, O+, O-" },
  { type: "B-", give: "B+, B-, AB+, AB-", take: "B-, O-" },
  { type: "AB+", give: "AB+", take: "All blood groups" },
  { type: "AB-", give: "AB+, AB-", take: "A-, B-, AB-, O-" },
  { type: "O+", give: "A+, B+, O+, AB+", take: "O+, O-" },
  { type: "O-", give: "All blood groups", take: "O-" },
];

const BloodGroups = () => {
  return (
    <section className=" rounded-xl  mt-10">
      <div className=" px-4">

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-red-600 mb-3">
            Blood Groups & Compatibility
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Learn which blood groups are compatible with each other. Knowing
            this can save lives in emergency situations.
          </p>
        </div>

        {/* Universal Info */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 rounded-xl bg-red-100 text-center shadow">
            <h3 className="text-xl font-semibold text-red-700 mb-2 flex justify-center align-center">
              <BiSolidDonateBlood /> Universal Donor
            </h3>
            <p className="text-gray-700">
              <span className="font-bold">O-</span> blood can be given to all
              blood groups.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-green-100 text-center shadow">
            <h3 className="text-xl font-semibold text-green-700 mb-2 flex justify-center align-center gap-1">
              <BiSolidInjection /> Universal Receiver
            </h3>
            <p className="text-gray-700">
              <span className="font-bold">AB+</span> blood can receive from all
              blood groups.
            </p>
          </div>
        </div>

        {/* Blood Group Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bloodGroups.map((group, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 text-center border"
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-red-600 text-white text-2xl font-bold">
                {group.type}
              </div>

              <p className="text-sm text-gray-500 mb-1">Can Donate To</p>
              <p className="font-semibold text-gray-800 mb-3">
                {group.give}
              </p>

              <p className="text-sm text-gray-500 mb-1">Can Receive From</p>
              <p className="font-semibold text-gray-800">
                {group.take}
              </p>
            </div>
          ))}
        </div>

        {/* Emergency Note */}
        <div className="mt-12 text-center bg-red-600 text-white p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-2 flex justify-center align-center gap-1">
            <MdOutlineEmergency /> Emergency Awareness
          </h3>
          <p>
            In critical emergencies, O- blood is often used when the patient’s
            blood type is unknown. Donate blood, save lives.
          </p>
        </div>

      </div>
    </section>
  );
};

export default BloodGroups;
