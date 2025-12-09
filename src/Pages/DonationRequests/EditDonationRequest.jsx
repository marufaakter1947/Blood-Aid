import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { getAuth } from "firebase/auth";

const EditDonationRequest = () => {
  const { id } = useParams(); // donation request ID
  const { user } = useAuth();
  const navigate = useNavigate();
  const auth = getAuth();

  const [requestData, setRequestData] = useState({
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

  // Fetch donation request by ID
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        // const auth = getAuth();
const token = await auth.currentUser.getIdToken();

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/donation-requests/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRequestData(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch donation request");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchRequest();
  }, [id, user,auth]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequestData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const cleanedData = { ...requestData };
delete cleanedData._id;
delete cleanedData.requesterName;
delete cleanedData.requesterEmail;
delete cleanedData.status;
delete cleanedData.donorInfo;

    try {
      const token = await auth.currentUser.getIdToken();
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/donation-requests/${id}`,
        cleanedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Donation request updated successfully!");
      navigate("/dashboard/my-donation-requests");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update donation request");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Edit Donation Request
      </h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block mb-1">Recipient Name</label>
          <input
            type="text"
            name="recipientName"
            value={requestData.recipientName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block mb-1">Recipient District</label>
            <input
              type="text"
              name="recipientDistrict"
              value={requestData.recipientDistrict}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div className="flex-1">
            <label className="block mb-1">Recipient Upazila</label>
            <input
              type="text"
              name="recipientUpazila"
              value={requestData.recipientUpazila}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-1">Hospital Name</label>
          <input
            type="text"
            name="hospitalName"
            value={requestData.hospitalName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={requestData.address}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block mb-1">Blood Group</label>
            <select
              name="bloodGroup"
              value={requestData.bloodGroup}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">Select Blood Group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                (bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="flex-1">
            <label className="block mb-1">Donation Date</label>
            <input
              type="date"
              name="donationDate"
              value={requestData.donationDate}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div className="flex-1">
            <label className="block mb-1">Donation Time</label>
            <input
              type="time"
              name="donationTime"
              value={requestData.donationTime}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-1">Message (Optional)</label>
          <textarea
            name="message"
            value={requestData.message}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
        >
          Update Donation Request
        </button>
      </form>
    </div>
  );
};

export default EditDonationRequest;
