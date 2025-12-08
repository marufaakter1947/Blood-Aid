import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router";
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
    if (selectedDistrict) {
      setFilteredUpazilas(
        upazilas.filter(
          (upa) => String(upa.district_id) === String(selectedDistrict)
        )
      );
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
    const avatarFile = form.avatar.files[0];

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setUploading(true);

      let avatarUrl = "";

      // Upload image if selected
      if (avatarFile) {
        const formData = new FormData();
        formData.append("image", avatarFile);

        const imgRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
          formData
        );

        avatarUrl = imgRes.data.data.display_url;
      }

      // 1️⃣ Firebase: create user with email/password
      const userCredential = await createUser(email, password);

      // 2️⃣ Update user profile with name & avatar
      if (name || avatarUrl) {
        await updateUserProfile(name, avatarUrl);
      }

      // 3️⃣ Send extra data to backend (MongoDB)
      await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
        name,
        email,
        role: "donor",
        avatar: avatarUrl,
        bloodGroup: selectedBlood,
        districtId: selectedDistrict,
        upazila: selectedUpazila,
        createdAt: new Date(),
      });

      toast.success("Registration Successful!");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Registration failed. Please try again.");
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
    <div className="flex justify-center items-center min-h-screen pb-10">
      <div className="w-full max-w-lg p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-4">
          Register Now
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            required
            placeholder="Full Name"
            className="w-full input"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="w-full input"
          />
          <input
            name="avatar"
            type="file"
            accept="image/*"
            className="w-full input"
          />

          <SelectWrapper>
            <select
              value={selectedBlood}
              onChange={(e) => setSelectedBlood(e.target.value)}
              required
              className="w-full input appearance-none cursor-pointer"
            >
              <option value="">Select Blood Group</option>
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </SelectWrapper>

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
              {districts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </SelectWrapper>

          <SelectWrapper>
            <select
              value={selectedUpazila}
              onChange={(e) => setSelectedUpazila(e.target.value)}
              required
              disabled={!selectedDistrict}
              className={`w-full input appearance-none cursor-pointer ${
                !selectedDistrict
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : ""
              }`}
            >
              <option value="">Select Upazila</option>
              {filteredUpazilas.map((upa) => (
                <option key={upa.id} value={upa.name}>
                  {upa.name}
                </option>
              ))}
            </select>
          </SelectWrapper>

          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              className="w-full input pr-10"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          <div className="relative">
            <input
              name="confirm_password"
              type={showConfirm ? "text" : "password"}
              required
              placeholder="Confirm Password"
              className="w-full input pr-10"
            />
            <span
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {showConfirm ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          <button
            disabled={loading || uploading}
            className="w-full bg-red-600 text-white py-2 rounded cursor-pointer"
          >
            {uploading ? "Creating Account..." : "Register"}
          </button>

          <p className="text-center font-semibold mt-2">
            Already have an account?{" "}
            <Link
              className="text-red-600 hover:text-red-900 hover:underline cursor-pointer"
              to="/login"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registration;
