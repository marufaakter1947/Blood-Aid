// import React, { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router";
// // import useAuth from "../../hooks/useAuth";
// import axios from "axios";
// import { FaChevronDown } from "react-icons/fa";
// import useAuth from "../../../hooks/useAuth";
// import { getAuth } from "firebase/auth";


// const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

// const CreateDonationRequest = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [districts, setDistricts] = useState([]);
//   const [upazilas, setUpazilas] = useState([]);
//   const [filteredUpazilas, setFilteredUpazilas] = useState([]);
//   const [recipientDistrict, setRecipientDistrict] = useState("");
//   const [recipientUpazila, setRecipientUpazila] = useState("");
//   const [formData, setFormData] = useState({
//     recipientName: "",
//     hospitalName: "",
//     address: "",
//     bloodGroup: "",
//     donationDate: "",
//     donationTime: "",
//     message: "",
//   });

//   // Load districts & upazilas
//   useEffect(() => {
//     fetch("/districts.json")
//       .then((res) => res.json())
//       .then((json) => {
//         const table = json.find((item) => item.type === "table");
//         setDistricts(table.data.sort((a, b) => a.name.localeCompare(b.name)));
//       });

//     fetch("/upazilas.json")
//       .then((res) => res.json())
//       .then((json) => {
//         const table = json.find((item) => item.type === "table");
//         setUpazilas(table.data);
//       });
//   }, []);

//   useEffect(() => {
//     if (recipientDistrict) {
//       setFilteredUpazilas(
//         upazilas.filter(
//           (upa) => String(upa.district_id) === String(recipientDistrict)
//         )
//       );
//     } else {
//       setFilteredUpazilas([]);
//     }
//   }, [recipientDistrict, upazilas]);

//   // Blocked user check (assuming user object has status)
//   if (user?.status === "blocked") {
//     return (
//       <div className="p-6">
//         <h2 className="text-xl font-bold text-red-600">
//           You are blocked! You cannot create a donation request.
//         </h2>
//       </div>
//     );
//   }

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const requestData = {
//         requesterName: user.displayName,
//         requesterEmail: user.email,
//         recipientName: formData.recipientName,
//         recipientDistrict: districts.find(
//           (d) => String(d.id) === String(recipientDistrict)
//         )?.name,
//         recipientUpazila: filteredUpazilas.find(
//           (u) => u.id === String(recipientUpazila)
//         )?.name,
//         hospitalName: formData.hospitalName,
//         address: formData.address,
//         bloodGroup: formData.bloodGroup,
//         donationDate: formData.donationDate,
//         donationTime: formData.donationTime,
//         message: formData.message,
//         status: "pending", // default
//       };
//       const auth = getAuth();
// const firebaseUser = auth.currentUser;
// const token = await firebaseUser.getIdToken();


//       await axios.post(`${import.meta.env.VITE_API_URL}/donation-requests`, requestData,
//         {
//             headers:{
//                 Authorization:`Bearer ${token}`
//             },
//         }
//       );

//       toast.success("Donation request created successfully!");
//       navigate("/dashboard");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to create donation request.");
//     }
//   };

//   const SelectWrapper = ({ children }) => (
//     <div className="relative">
//       {children}
//       <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//     </div>
//   );

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
//       <h2 className="text-2xl font-bold text-red-600 mb-4">
//         Create Donation Request
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-3">
//         {/* Requester Info */}
//         <input
//           type="text"
//           value={user?.displayName || ""}
//           readOnly
//           className="w-full input bg-gray-100"
//           placeholder="Requester Name"
//         />
//         <input
//           type="email"
//           value={user?.email || ""}
//           readOnly
//           className="w-full input bg-gray-100"
//           placeholder="Requester Email"
//         />

//         {/* Recipient Info */}
//         <input
//           type="text"
//           name="recipientName"
//           value={formData.recipientName}
//           onChange={handleChange}
//           required
//           placeholder="Recipient Name"
//           className="w-full input"
//         />

//         <SelectWrapper>
//           <select
//             value={recipientDistrict}
//             onChange={(e) => {
//               setRecipientDistrict(e.target.value);
//               setRecipientUpazila("");
//             }}
//             required
//             className="w-full input appearance-none cursor-pointer"
//           >
//             <option value="">Select District</option>
//             {districts.map((d) => (
//               <option key={d.id} value={d.id}>
//                 {d.name}
//               </option>
//             ))}
//           </select>
//         </SelectWrapper>

//         <SelectWrapper>
//           <select
//             value={recipientUpazila}
//             onChange={(e) => setRecipientUpazila(e.target.value)}
//             required
//             disabled={!recipientDistrict}
//             className={`w-full input appearance-none cursor-pointer ${
//               !recipientDistrict
//                 ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                 : ""
//             }`}
//           >
//             <option value="">Select Upazila</option>
//             {filteredUpazilas.map((upa) => (
//               <option key={upa.id} value={upa.id}>
//                 {upa.name}
//               </option>
//             ))}
//           </select>
//         </SelectWrapper>

//         <input
//           type="text"
//           name="hospitalName"
//           value={formData.hospitalName}
//           onChange={handleChange}
//           required
//           placeholder="Hospital Name"
//           className="w-full input"
//         />

//         <input
//           type="text"
//           name="address"
//           value={formData.address}
//           onChange={handleChange}
//           required
//           placeholder="Full Address Line"
//           className="w-full input"
//         />

//         <SelectWrapper>
//           <select
//             name="bloodGroup"
//             value={formData.bloodGroup}
//             onChange={handleChange}
//             required
//             className="w-full input appearance-none cursor-pointer"
//           >
//             <option value="">Select Blood Group</option>
//             {bloodGroups.map((bg) => (
//               <option key={bg} value={bg}>
//                 {bg}
//               </option>
//             ))}
//           </select>
//         </SelectWrapper>

//         <input
//           type="date"
//           name="donationDate"
//           value={formData.donationDate}
//           onChange={handleChange}
//           required
//           className="w-full input"
//         />

//         <input
//           type="time"
//           name="donationTime"
//           value={formData.donationTime}
//           onChange={handleChange}
//           required
//           className="w-full input"
//         />

//         <textarea
//           name="message"
//           value={formData.message}
//           onChange={handleChange}
//           required
//           placeholder="Request Message"
//           className="w-full input h-24"
//         />

//         <button
//           type="submit"
//           className="w-full bg-red-600 text-white py-2 rounded"
//         >
//           Create Request
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateDonationRequest;
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { getAuth } from "firebase/auth";
import DonationRequestForm from "../../DonationRequests/DonationRequestForm";
// import DonationRequestForm from "./DonationRequestForm";

const CreateDonationRequest = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [recipientDistrict, setRecipientDistrict] = useState("");
  const [recipientUpazila, setRecipientUpazila] = useState("");
  const [formData, setFormData] = useState({
    recipientName: "",
    hospitalName: "",
    address: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    message: "",
  });

  // Load districts & upazilas
  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((json) => {
        const table = json.find((item) => item.type === "table");
        setDistricts(table.data.sort((a, b) => a.name.localeCompare(b.name)));
      });

    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((json) => {
        const table = json.find((item) => item.type === "table");
        setUpazilas(table.data);
      });
  }, []);

  useEffect(() => {
    if (recipientDistrict) {
      setFilteredUpazilas(
        upazilas.filter(
          (upa) => String(upa.district_id) === String(recipientDistrict)
        )
      );
    } else setFilteredUpazilas([]);
  }, [recipientDistrict, upazilas]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken();

      const requestData = {
        requesterName: user.displayName,
        requesterEmail: user.email,
        recipientName: formData.recipientName,
        recipientDistrict: districts.find(
          (d) => String(d.id) === String(recipientDistrict)
        )?.name,
        recipientUpazila: filteredUpazilas.find(
          (u) => u.id === String(recipientUpazila)
        )?.name,
        hospitalName: formData.hospitalName,
        address: formData.address,
        bloodGroup: formData.bloodGroup,
        donationDate: formData.donationDate,
        donationTime: formData.donationTime,
        message: formData.message,
        status: "pending",
      };

      await fetch(`${import.meta.env.VITE_API_URL}/donation-requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      toast.success("Donation request created successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create donation request.");
    }
  };

  if (user?.status === "blocked") {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold text-red-600">
          You are blocked! You cannot create a donation request.
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Create Donation Request
      </h2>

      <DonationRequestForm
        formData={formData}
        setFormData={setFormData}
        districts={districts}
        filteredUpazilas={filteredUpazilas}
        recipientDistrict={recipientDistrict}
        setRecipientDistrict={setRecipientDistrict}
        recipientUpazila={recipientUpazila}
        setRecipientUpazila={setRecipientUpazila}
        onSubmit={handleSubmit}
        submitText="Create Request"
      />
    </div>
  );
};

export default CreateDonationRequest;
