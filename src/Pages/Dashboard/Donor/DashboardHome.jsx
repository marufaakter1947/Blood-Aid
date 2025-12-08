import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { Link } from "react-router";

const DashboardHome = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      const token = await user.getIdToken();
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/donation-requests/recent`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRequests(res.data);
    };

    loadData();
  }, [user]);

  const handleStatusChange = async (id, status) => {
    const token = await user.getIdToken();
    await axios.patch(
      `${import.meta.env.VITE_API_URL}/donation-requests/status/${id}`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setRequests((prev) =>
      prev.map((r) =>
        r._id === id ? { ...r, status } : r
      )
    );
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this request?")) return;

    const token = await user.getIdToken();
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/donation-requests/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setRequests((prev) => prev.filter((r) => r._id !== id));
  };

  return (
    <div className="p-6">
      {/* Welcome */}
      <h2 className="text-2xl font-bold mb-4">
        Welcome, <span className="text-red-600">{user?.displayName}</span> 👋
      </h2>

      {/* Recent Requests */}
      {requests.length > 0 && (
        <>
          <h3 className="text-xl font-semibold mb-3">
            My Recent Donation Requests
          </h3>

          <div className="overflow-x-auto">
            <table className="table w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th>Recipient</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Blood</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {requests.map((r) => (
                  <tr key={r._id}>
                    <td>{r.recipientName}</td>
                    <td>
                      {r.recipientDistrict}, {r.recipientUpazila}
                    </td>
                    <td>{r.donationDate}</td>
                    <td>{r.donationTime}</td>
                    <td>{r.bloodGroup}</td>
                    <td className="capitalize">{r.status}</td>

                    <td className="space-x-1">
                      {r.status === "inprogress" && (
                        <>
                          <button
                            onClick={() =>
                              handleStatusChange(r._id, "done")
                            }
                            className="btn btn-xs bg-green-500 text-white"
                          >
                            Done
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(r._id, "canceled")
                            }
                            className="btn btn-xs bg-red-500 text-white"
                          >
                            Cancel
                          </button>
                        </>
                      )}

                      <Link
                        to={`/dashboard/edit-request/${r._id}`}
                        className="btn btn-xs bg-blue-500 text-white"
                      >
                        Edit
                      </Link>

                      <Link
                        to={`/dashboard/request/${r._id}`}
                        className="btn btn-xs bg-gray-500 text-white"
                      >
                        View
                      </Link>

                      <button
                        onClick={() => handleDelete(r._id)}
                        className="btn btn-xs bg-black text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-right">
            <Link
              to="/dashboard/my-donation-requests"
              className="btn bg-red-600 text-white"
            >
              View My All Requests →
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardHome;
