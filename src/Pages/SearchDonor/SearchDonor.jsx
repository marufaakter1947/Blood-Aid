import React, { useEffect, useState } from "react";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const SearchDonorPage = () => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
//   const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);

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

    // Fetch donors from backend
//    fetch(`${import.meta.env.VITE_API_URL}/donors`)
//   .then((res) => res.json())
//   .then((data) => setDonors(data))
//   .catch((err) => console.error("Failed to fetch donors:", err));
  }, []);
// Fetch donors from backend ✅



  // Filter upazilas based on selected district
  useEffect(() => {
    if (district) {
      setFilteredUpazilas(
        upazilas.filter((upa) => String(upa.district_id) === String(district))
      );
    } else {
      setFilteredUpazilas([]);
    }
    setUpazila("");
  }, [district, upazilas]);

//   const handleSearch = () => {
//     const results = donors.filter(
//       (donor) =>
//         (bloodGroup ? donor.bloodGroup === bloodGroup : true) &&
//         (district ? donor.district === districts.find((d) => String(d.id) === district)?.name : true) &&
//         (upazila ? donor.upazila === filteredUpazilas.find((u) => String(u.id) === upazila)?.name : true)
//     );
//     setFilteredDonors(results);
//   };
// const handleSearch = async () => {
//   try {
//     const districtName =
//       districts.find((d) => String(d.id) === district)?.name || "";

//     const upazilaName =
//       filteredUpazilas.find((u) => String(u.id) === upazila)?.name || "";

//     const res = await fetch(
//       `${import.meta.env.VITE_API_URL}/donors/search?bloodGroup=${bloodGroup}&district=${districtName}&upazila=${upazilaName}`
//     );

//     const data = await res.json();
//     setFilteredDonors(data);
//   } catch (error) {
//     console.error("Failed to fetch donors:", error);
//   }
// };
const handleSearch = async () => {
  try {
    const districtName =
      districts.find((d) => String(d.id) === district)?.name || "";

    const upazilaName =
      filteredUpazilas.find((u) => String(u.id) === upazila)?.name || "";

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/donors/search?bloodGroup=${bloodGroup}&district=${districtName}&upazila=${upazilaName}`
    );


    const data = await res.json();
    console.log(data)
    setFilteredDonors(data);
  } catch (error) {
    console.error("Failed to fetch donors:", error);
  }
};


  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Blood Donors</h1>

      {/* Search Form */}
      <div className="bg-white shadow-md rounded p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block mb-1 font-medium">Blood Group</label>
            <select
              className="w-full border rounded p-2"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
            >
              <option value="">Select</option>
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">District</label>
            <select
              className="w-full border rounded p-2"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            >
              <option value="">Select</option>
              {districts.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Upazila</label>
            <select
              className="w-full border rounded p-2"
              value={upazila}
              onChange={(e) => setUpazila(e.target.value)}
              disabled={!district}
            >
              <option value="">Select</option>
              {filteredUpazilas.map((u) => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleSearch}
              className="w-full bg-red-600 text-white font-semibold py-2 rounded hover:bg-red-700"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div>
        {filteredDonors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDonors.map((donor) => (
              <div key={donor._id} className="border rounded p-4 shadow">
                <h2 className="font-bold text-lg">{donor.name}</h2>
                <p>Blood Group: <span className="font-semibold">{donor.bloodGroup}</span></p>
                <p>Location: {donor.upazila}, {donor.district}</p>
                <p>Phone: {donor.phone}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No donors found. Please use the search form above.</p>
        )}
      </div>
    </div>
  );
};

export default SearchDonorPage;
