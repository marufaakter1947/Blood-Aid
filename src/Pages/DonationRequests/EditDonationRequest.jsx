import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import DonationRequestForm from "./DonationRequestForm";
import LoadingSpinner from "../../Component/Shared/LoadingSpinner";
// import DonationRequestForm from "./DonationRequestForm";

const EditDonationRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [recipientDistrict, setRecipientDistrict] = useState("");
  const [recipientUpazila, setRecipientUpazila] = useState("");
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientDistrict: "",
    recipientUpazila: "",
    hospitalName: "",
    address: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    message: "",
  });

  const [loading, setLoading] = useState(true);

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

  
useEffect(() => {
  if (districts.length === 0 || upazilas.length === 0) return;

  const fetchRequest = async () => {
    try {
      const res = await axiosSecure.get(`/donation-requests/${id}`);
      const data = res.data;

      setFormData(data);

      // map district/upazila names to IDs
      const district = districts.find(d => d.name === data.recipientDistrict);
      const upazila = upazilas.find(u => u.name === data.recipientUpazila);

      setRecipientDistrict(district?.id || "");
      setRecipientUpazila(upazila?.id || "");

      // filter upazilas based on district
      if (district) {
        setFilteredUpazilas(
          upazilas.filter(u => String(u.district_id) === String(district.id))
        );
      }

    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch donation request");
    } finally {
      setLoading(false);
    }
  };

  fetchRequest();
}, [id, axiosSecure, districts, upazilas]);


//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     const cleanedData = { ...formData };
//     delete cleanedData._id;
//     delete cleanedData.requesterName;
//     delete cleanedData.requesterEmail;
//     delete cleanedData.status;
//     delete cleanedData.donorInfo;

//     try {
//       await axiosSecure.patch(`/donation-requests/${id}`, cleanedData);
//       toast.success("Donation request updated successfully!");
//       navigate("/dashboard/my-donation-requests");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to update donation request");
//     }
//   };
const handleUpdate = async (e) => {
  e.preventDefault();

  // Map selected IDs back to names
  const districtName = districts.find(d => d.id === recipientDistrict)?.name || "";
  const upazilaName = upazilas.find(u => u.id === recipientUpazila)?.name || "";

  const cleanedData = {
    ...formData,
    recipientDistrict: districtName,
    recipientUpazila: upazilaName,
  };

  // Remove immutable fields
  delete cleanedData._id;
  delete cleanedData.requesterName;
  delete cleanedData.requesterEmail;
  delete cleanedData.status;
  delete cleanedData.donorInfo;

  try {
    await axiosSecure.patch(`/donation-requests/${id}`, cleanedData);
    toast.success("Donation request updated successfully!");
    navigate("/dashboard/my-donation-requests");
  } catch (err) {
    console.error(err);
    toast.error("Failed to update donation request");
  }
};


  if (loading) return <div className="p-6"><LoadingSpinner></LoadingSpinner></div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Edit Donation Request
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
        onSubmit={handleUpdate}
        submitText="Update Request"
      />
    </div>
  );
};

export default EditDonationRequest;
