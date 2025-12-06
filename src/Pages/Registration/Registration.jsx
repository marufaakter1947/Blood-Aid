// import React, { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router";
// import useAuth from "../../hooks/useAuth";
// import axios from "axios";
// import { FaChevronDown } from "react-icons/fa";
// import { FiEye, FiEyeOff } from "react-icons/fi";


// const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

// const Registration = () => {
//   const { createUser, updateUserProfile, loading } = useAuth();
//   const navigate = useNavigate();

//   const [districts, setDistricts] = useState([]);
//   const [upazilas, setUpazilas] = useState([]);
//   const [filteredUpazilas, setFilteredUpazilas] = useState([]);
//   const [selectedDistrictId, setSelectedDistrictId] = useState("");
//   const [uploading, setUploading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [selectedBlood, setSelectedBlood] = useState("");
// const [selectedDistrict, setSelectedDistrict] = useState("");
// const [selectedUpazila, setSelectedUpazila] = useState("");


//   //Load Districts
//   useEffect(() => {
//     fetch("/districts.json")
//       .then((res) => res.json())
//       .then((json) => {
//         const table = json.find((item) => item.type === "table");

//         const sorted = table.data.sort((a, b) => a.name.localeCompare(b.name));

//         setDistricts(sorted);
//       });
//   }, []);

//   // Load Upazilas
//   useEffect(() => {
//     fetch("/upazilas.json")
//       .then((res) => res.json())
//       .then((json) => {
//         const table = json.find((item) => item.type === "table");
//         setUpazilas(table.data);
//       });
//   }, []);

//   // Filter upazilas by district
//   useEffect(() => {
//     if (selectedDistrictId) {
//       const filtered = upazilas.filter(
//         (upa) => upa.district_id === selectedDistrictId
//       );
//       setFilteredUpazilas(filtered);
//     } else {
//       setFilteredUpazilas([]);
//     }
//   }, [selectedDistrictId, upazilas]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const form = e.target;

//     const name = form.name.value;
//     const email = form.email.value;
//     const password = form.password.value;
//     const confirmPassword = form.confirm_password.value;
//     const bloodGroup = form.bloodGroup.value;
//     const district = form.district.options[form.district.selectedIndex].text;
//     const upazila = form.upazila.value;
//     const image = form.avatar.files[0];

//     if (password !== confirmPassword) {
//       return toast.error("Passwords do not match");
//     }

//     try {
//       setUploading(true);

//       // Upload avatar
//       const imageData = new FormData();
//       imageData.append("image", image);

//       const imgRes = await axios.post(
//         `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
//         imageData
//       );

//       const avatar = imgRes.data.data.display_url;

//       //Firebase auth
//       await createUser(email, password);
//       await updateUserProfile(name, avatar);

//       //Save to DB
//       const userInfo = {
//         name,
//         email,
//         avatar,
//         bloodGroup,
//         district,
//         upazila,
//         role: "donor",
//         status: "active",
//       };

//       await axios.post("http://localhost:5000/users", userInfo);

//       toast.success("Registration Successful");
//       navigate("/");
//     } catch (err) {
//       console.error(err);
//       toast.error("Registration failed");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const SelectWrapper = ({ children }) => (
//     <div className="relative">
//       {children}
//       <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//     </div>
//   );

//   return (
//     <div className="flex justify-center items-center min-h-screen pb-10 pt-5 ">
//       <div className="w-full max-w-lg p-8 bg-white rounded shadow">
//         <h2 className="text-2xl font-bold text-center text-red-600 mb-4">
//           Register Now
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-3">
//           <input
//             name="name"
//             required
//             placeholder="Full Name"
//             className="w-full input"
//           />

//           <input
//             name="email"
//             type="email"
//             required
//             placeholder="Email"
//             className="w-full input"
//           />

//           <input
//             name="avatar"
//             type="file"
//             accept="image/*"
//             required
//             className="w-full input"
//           />

//           {/*Blood Group */}
//           {/* <SelectWrapper>
//             <select
//               name="bloodGroup"
//               required
//               className=" w-full input appearance-none"
//             >
//               <option value="">Select Blood Group</option>
//               {bloodGroups.map((bg) => (
//                 <option key={bg} value={bg}>
//                   {bg}
//                 </option>
//               ))}
//             </select>
//           </SelectWrapper> */}
//           <SelectWrapper>
//   <select
//     name="bloodGroup"
//     value={selectedBlood}
//     onChange={(e) => setSelectedBlood(e.target.value)}
//     required
//     className="w-full input appearance-none cursor-pointer"
//   >
//     <option value="">Select Blood Group</option>
//     {bloodGroups.map((bg) => (
//       <option key={bg} value={bg}>
//         {bg}
//       </option>
//     ))}
//   </select>
// </SelectWrapper>


//           {/*District */}
//           {/* <SelectWrapper>
//             <select
//               name="district"
//               required
//               className="w-full input appearance-none"
//               onChange={(e) => setSelectedDistrictId(e.target.value)}
//             >
//               <option value="">Select District</option>
//               {districts.map((dist) => (
//                 <option key={dist.id} value={dist.id}>
//                   {dist.name}
//                 </option>
//               ))}
//             </select>
//           </SelectWrapper> */}

//          <SelectWrapper>
//   <select
//     name="district"
//     value={selectedDistrict}
//     onChange={(e) => {
//       setSelectedDistrict(e.target.value);
//       setSelectedUpazila(""); // district change হলে upazila reset
//     }}
//     required
//     className="w-full input appearance-none cursor-pointer"
//   >
//     <option value="">Select District</option>
//     {districts.map((dist) => (
//       <option key={dist.id} value={dist.id}>
//         {dist.name}
//       </option>
//     ))}
//   </select>
// </SelectWrapper>



//           {/* <SelectWrapper>
//             <select
//               name="upazila"
//               required
//               disabled={!selectedDistrictId}
//               className={`w-full input appearance-none
//       ${!selectedDistrictId && "bg-gray-100 text-gray-400 cursor-not-allowed"}
//     `}
//             >
//               <option value="">Select Upazila</option>
//               {filteredUpazilas.map((upa) => (
//                 <option key={upa.id} value={upa.name}>
//                   {upa.name}
//                 </option>
//               ))}
//             </select>
//           </SelectWrapper> */}
//          <SelectWrapper>
//   <select
//     name="upazila"
//     value={selectedUpazila}
//     onChange={(e) => setSelectedUpazila(e.target.value)}
//     required
//     disabled={!selectedDistrict}
//     className={`w-full input appearance-none cursor-pointer
//       ${!selectedDistrict && "bg-gray-100 text-gray-400 cursor-not-allowed"}
//     `}
//   >
//     <option value="">Select Upazila</option>
//     {filteredUpazilas.map((upa) => (
//       <option key={upa.id} value={upa.name}>
//         {upa.name}
//       </option>
//     ))}
//   </select>
// </SelectWrapper>



//           <div className="relative">
//             <input
//               name="password"
//               type={showPassword ? "text" : "password"}
//               required
//               placeholder="Password"
//               className="w-full input pr-10"
//             />

//             <span
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
//             >
//               {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
//             </span>
//           </div>

//           <div className="relative">
//             <input
//               name="confirm_password"
//               type={showConfirm ? "text" : "password"}
//               required
//               placeholder="Confirm Password"
//               className="w-full input pr-10"
//             />

//             <span
//               onClick={() => setShowConfirm(!showConfirm)}
//               className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
//             >
//               {showConfirm ? <FiEyeOff size={18} /> : <FiEye size={18} />}
//             </span>
//           </div>

//           <button
//             disabled={loading || uploading}
//             className="w-full bg-red-600 text-white py-2 rounded"
//           >
//             {uploading ? "Creating Account..." : "Register"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Registration;


import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { FaChevronDown } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const Registration = () => {
  const { createUser, updateUserProfile, loading } = useAuth();
  const navigate = useNavigate();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  const [selectedBlood, setSelectedBlood] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");

  const [uploading, setUploading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  /* Load Districts */
  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((json) => {
        const table = json.find((item) => item.type === "table");
        const sorted = [...table.data].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setDistricts(sorted);
      });
  }, []);

  /* Load Upazilas */
  useEffect(() => {
    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((json) => {
        const table = json.find((item) => item.type === "table");
        setUpazilas(table.data);
      });
  }, []);

  /* Filter Upazilas */
  useEffect(() => {
    if (selectedDistrict) {
      const filtered = upazilas.filter(
        (upa) => String(upa.district_id) === String(selectedDistrict)
      );
      setFilteredUpazilas(filtered);
    } else {
      setFilteredUpazilas([]);
    }
  }, [selectedDistrict, upazilas]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirm_password.value;
    const image = form.avatar.files[0];

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setUploading(true);

      const imageData = new FormData();
      imageData.append("image", image);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
        imageData
      );

      const avatar = imgRes.data.data.display_url;

      await createUser(email, password);
      await updateUserProfile(name, avatar);

      const userInfo = {
        name,
        email,
        avatar,
        bloodGroup: selectedBlood,
        district:
          districts.find((d) => d.id === selectedDistrict)?.name || "",
        upazila: selectedUpazila,
        role: "donor",
        status: "active",
      };

      await axios.post("http://localhost:5000/users", userInfo);

      toast.success("Registration Successful 🩸");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Registration failed");
    } finally {
      setUploading(false);
    }
  };

  const SelectWrapper = ({ children }) => (
    <div className="relative">
      {children}
      <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );

  return (
    <div className="flex justify-center items-center min-h-screen py-10">
      <div className="w-full max-w-lg p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-4">
          Register Now
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="name" required placeholder="Full Name" className="w-full input" />
          <input name="email" type="email" required placeholder="Email" className="w-full input" />
          <input name="avatar" type="file" accept="image/*" required className="w-full input" />

          {/* Blood Group */}
          <SelectWrapper>
            <select
              value={selectedBlood}
              onChange={(e) => setSelectedBlood(e.target.value)}
              required
              className="w-full input appearance-none cursor-pointer"
            >
              <option value="">Select Blood Group</option>
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </SelectWrapper>

          {/* District */}
          <SelectWrapper>
            <select
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setSelectedUpazila("");
              }}
              required
              className="w-full input appearance-none cursor-pointer"
            >
              <option value="">Select District</option>
              {districts.map((dist) => (
                <option key={dist.id} value={dist.id}>{dist.name}</option>
              ))}
            </select>
          </SelectWrapper>

          {/* Upazila */}
          <SelectWrapper>
            <select
              value={selectedUpazila}
              onChange={(e) => setSelectedUpazila(e.target.value)}
              required
              disabled={!selectedDistrict}
              className={`w-full input appearance-none cursor-pointer
                ${!selectedDistrict && "bg-gray-100 text-gray-400 cursor-not-allowed"}
              `}
            >
              <option value="">Select Upazila</option>
              {filteredUpazilas.map((upa) => (
                <option key={upa.id} value={upa.name}>{upa.name}</option>
              ))}
            </select>
          </SelectWrapper>

          {/* Password */}
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              className="w-full input pr-10"
            />
            <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              name="confirm_password"
              type={showConfirm ? "text" : "password"}
              required
              placeholder="Confirm Password"
              className="w-full input pr-10"
            />
            <span onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
              {showConfirm ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          <button
            disabled={loading || uploading}
            className="w-full bg-red-600 text-white py-2 rounded"
          >
            {uploading ? "Creating Account..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
