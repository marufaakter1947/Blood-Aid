import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const loadRequest = async () => {
      try {
        const token = await user.getIdToken();
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/donation-requests/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRequest(res.data);
      } catch (err) {
        toast.error("Failed to load request");
      } finally {
        setLoading(false);
      }
    };

    loadRequest();
  }, [id, user]);

  useEffect(() => {
    const fetchRole = async () => {
      if (!user?.email) return;

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/role?email=${user.email}`
      );
      setRole(res.data.role);
    };

    fetchRole();
  }, [user]);

  const handleConfirmDonation = async () => {
    try {
      const token = await user.getIdToken();

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/donation-requests/confirm/${id}`,
        {
          donorName: user.displayName,
          donorEmail: user.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Donation confirmed!");
      setOpenModal(false);
      setRequest({ ...request, status: "inprogress" });
    } catch (err) {
      toast.error("Failed to confirm donation");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!request) return null;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Donation Request Details
      </h2>

      <div className="space-y-2 text-sm">
        <p>
          <b>Recipient:</b> {request.recipientName}
        </p>
        <p>
          <b>Location:</b> {request.recipientDistrict},{" "}
          {request.recipientUpazila}
        </p>
        <p>
          <b>Hospital:</b> {request.hospitalName}
        </p>
        <p>
          <b>Address:</b> {request.address}
        </p>
        <p>
          <b>Blood Group:</b> {request.bloodGroup}
        </p>
        <p>
          <b>Date:</b> {request.donationDate}
        </p>
        <p>
          <b>Time:</b> {request.donationTime}
        </p>
        <p>
          <b>Message:</b> {request.message}
        </p>
        <p className="capitalize">
          <b>Status:</b> {request.status}
        </p>
      </div>

      {request.status === "pending" && role !== "volunteer" && (
        <button
          onClick={() => setOpenModal(true)}
          className="mt-4 bg-red-600 text-white px-6 py-2 rounded"
        >
          Donate
        </button>
      )}

      {openModal && role !== "volunteer" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-lg font-bold mb-4">Confirm Donation</h3>

            <input
              className="w-full mb-2 input bg-gray-100"
              value={user.displayName}
              readOnly
            />
            <input
              className="w-full mb-4 input bg-gray-100"
              value={user.email}
              readOnly
            />

            <div className="flex gap-3">
              <button
                onClick={handleConfirmDonation}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Confirm
              </button>
              <button
                onClick={() => setOpenModal(false)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationRequestDetails;
