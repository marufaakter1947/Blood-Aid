import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const DonationRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/donation-requests/public`
        );
        setRequests(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleView = (id) => {
    if (!user) {
      // ✅ not logged in → redirect to login
      navigate("/login", {
        state: { from: `/donation-requests/${id}` },
      });
    } else {
      navigate(`/donation-requests/${id}`);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto pt-15">
      <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
        Pending Blood Donation Requests
      </h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">
          No pending donation requests found.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-white rounded shadow p-5 border"
            >
              <h3 className="font-semibold text-lg">
                {req.recipientName}
              </h3>

              <p>📍 {req.recipientDistrict}, {req.recipientUpazila}</p>
              <p>🩸 Blood Group: <b>{req.bloodGroup}</b></p>
              <p>📅 Date: {req.donationDate}</p>
              <p>⏰ Time: {req.donationTime}</p>

              <button
                onClick={() => handleView(req._id)}
                className="mt-3 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
              >
                View
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonationRequest;
