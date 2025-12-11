
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../Component/Shared/LoadingSpinner";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    avatar: "",
    district: "",
    upazila: "",
    bloodGroup: "",
  });
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load districts & upazilas from JSON
  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((json) => {
        const table = json.find((item) => item.type === "table");
        if (table) {
          const sorted = table.data.sort((a, b) => a.name.localeCompare(b.name));
          setDistricts(sorted);
        }
      })
      .catch(() => toast.error("Failed to load districts"));

    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((json) => {
        const table = json.find((item) => item.type === "table");
        if (table) setUpazilas(table.data);
      })
      .catch(() => toast.error("Failed to load upazilas"));
  }, []);

  // Filter upazilas based on selected district
  useEffect(() => {
    if (profile.district) {
      setFilteredUpazilas(
        upazilas.filter(
          (upa) => String(upa.district_id) === String(profile.district)
        )
      );
    } else {
      setFilteredUpazilas([]);
    }
  }, [profile.district, upazilas]);

  // Fetch user profile
  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const token = await user.getIdToken();
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        // Find district id based on name from JSON for pre-selection
        const districtObj = districts.find((d) => d.name === data.district);

        setProfile({
          name: data.name || "",
          email: data.email || "",
          avatar: data.photoURL || data.avatar || "",
          district: districtObj ? districtObj.id : data.district || "",
          upazila: data.upazila || "",
          bloodGroup: data.bloodGroup || "",
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, districts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "district") {
      setProfile((prev) => ({ ...prev, district: value, upazila: "" }));
    } else {
      setProfile((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    try {
      const token = await user.getIdToken();
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/profile`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (data.modifiedCount || data.success) {
        toast.success("Profile updated successfully");
        setIsEditing(false);
      } else {
        toast.error("Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  if (loading) return <div className="text-center py-10"><LoadingSpinner></LoadingSpinner></div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-red-100 rounded">
      <Toaster position="top-right" />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Profile</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-600 transition"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-400 text-white rounded hover:bg-green-600 transition"
          >
            Save
          </button>
        )}
      </div>

      {!isEditing ? (
        <div className="space-y-4">
          <div>
            <img src={profile.avatar} alt="Avatar" className="w-32 h-32 rounded-full object-cover" />
          </div>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p>
            <strong>District:</strong>{" "}
            {districts.find((d) => String(d.id) === String(profile.district))?.name || profile.district}
          </p>
          <p><strong>Upazila:</strong> {profile.upazila}</p>
          <p><strong>Blood Group:</strong> {profile.bloodGroup}</p>
        </div>
      ) : (
        <form className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Avatar URL</label>
            <input
              type="text"
              name="avatar"
              value={profile.avatar}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              disabled
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">District</label>
            <select
              name="district"
              value={profile.district}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select district</option>
              {districts.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Upazila</label>
            <select
              name="upazila"
              value={profile.upazila}
              onChange={handleChange}
              disabled={!profile.district}
              className={`w-full border px-3 py-2 rounded ${!profile.district ? "bg-gray-100 text-gray-400" : ""}`}
            >
              <option value="">Select upazila</option>
              {filteredUpazilas.map((u) => (
                <option key={u.id} value={u.name}>{u.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Blood Group</label>
            <select
              name="bloodGroup"
              value={profile.bloodGroup}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select blood group</option>
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
