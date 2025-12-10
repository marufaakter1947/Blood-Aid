import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { FiMoreVertical } from "react-icons/fi";
import { getAuth } from "firebase/auth";



const statusOptions = ["all", "pending", "inprogress", "done", "canceled"];

const ITEMS_PER_PAGE = 4;

const DonationRequestsTable = ({
  fetchAll = false,
  title = "My Donation Requests",
  maxItems = null, // new prop to limit number of requests
}) => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [role, setRole] = useState(null);

const getToken = async () => {
  const auth = getAuth();
  if (!auth.currentUser) return null;
  return await auth.currentUser.getIdToken();
};
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // const token = await user.getIdToken();
        const token = await getToken();
        const endpoint = fetchAll
          ? `${import.meta.env.VITE_API_URL}/donation-requests`
          : `${import.meta.env.VITE_API_URL}/donation-requests/my`;

        const res = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });

        let data = res.data;

        // Limit items if maxItems is provided
        if (maxItems) {
          data = data.slice(0, maxItems);
        }

        setRequests(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load donation requests");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchRequests();
  }, [user, fetchAll, maxItems]);

  useEffect(() => {
  if (!user?.email) return;

  


  const fetchRole = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/users/role?email=${user.email}`
    );
    setRole(res.data.role);
  };

  fetchRole();
}, [user]);

  const filteredRequests =
    filterStatus === "all"
      ? requests
      : requests.filter((req) => req.status === filterStatus);

  const totalPages = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredRequests.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => setCurrentPage(1), [filterStatus]);

  // Delete
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This donation request will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      // const token = await user.getIdToken();
      const token = await getToken();

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/donation-requests/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setRequests((prev) => prev.filter((r) => r._id !== id));

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Donation request has been deleted.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Failed to delete donation request.",
      });
    }
  };

  // Update Status
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      // const token = await user.getIdToken();
      const token = await getToken();
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/donation-requests/update-status/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setRequests((prev) =>
          prev.map((r) => (r._id === id ? { ...r, status: newStatus } : r))
        );
        toast.success(`Donation marked as ${newStatus}`);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!requests.length) return null; // hide if no requests

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <h2 className="text-xl font-bold text-red-600">{title}</h2>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="mt-2 md:mt-0 border rounded px-3 py-1"
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-center text-sm">
          <thead className="bg-gray-100">
            <tr>
              {fetchAll && <th className="border px-3 py-2">Requester</th>}
              <th className="border px-3 py-2">Recipient</th>
              <th className="border px-3 py-2">Location</th>
              <th className="border px-3 py-2">Date</th>
              <th className="border px-3 py-2">Time</th>
              <th className="border px-3 py-2">Blood</th>
              <th className="border px-3 py-2">Status</th>
              <th className="border px-3 py-2">Donor Info</th>
              <th className="border px-3 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((req) => (
              <tr key={req._id} className="text-sm">
                {fetchAll && (
                  <td className="border px-3 py-2">{req.requesterName}</td>
                )}
                <td className="border px-3 py-2">{req.recipientName}</td>
                <td className="border px-3 py-2">
                  {req.recipientDistrict}, {req.recipientUpazila}
                </td>
                <td className="border px-3 py-2">{req.donationDate}</td>
                <td className="border px-3 py-2">{req.donationTime}</td>
                <td className="border px-3 py-2 font-semibold">
                  {req.bloodGroup}
                </td>
                <td className="border px-3 py-2 capitalize">{req.status}</td>
                <td className="border px-3 py-2">
                  {req.status === "inprogress" && req.donorInfo ? (
                    <>
                      <p>{req.donorInfo.name}</p>
                      <p className="text-xs text-gray-500">
                        {req.donorInfo.email}
                      </p>
                    </>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="border px-3 py-2 relative">
  <button
    onClick={() =>
      setDropdownOpen(dropdownOpen === req._id ? null : req._id)
    }
    className="p-1 hover:bg-gray-100 rounded"
  >
    <FiMoreVertical />
  </button>

  {dropdownOpen === req._id && (
    <div className="absolute right-0 mt-1 w-36 bg-white border shadow rounded z-10 flex flex-col text-left">
      
      {/* View allowed for all */}
      <Link
       to={`/donation-requests/${req._id}`}
        className="px-3 py-2 hover:bg-gray-100"
      >
        View
      </Link>

      {/* Admin only */}
      {role === "admin" && (
        <>
          <Link
            to={`/dashboard/edit-request/${req._id}`}
            className="px-3 py-2 hover:bg-gray-100"
          >
            Edit
          </Link>

          <button
            onClick={() => handleDelete(req._id)}
            className="px-3 py-2 text-red-600 hover:bg-gray-100 text-left"
          >
            Delete
          </button>
        </>
      )}

      {/* Admin + Volunteer can update status */}
      {req.status === "inprogress" &&
        (role === "admin" || role === "volunteer") && (
          <>
            <button
              onClick={() => handleStatusUpdate(req._id, "done")}
              className="px-3 py-2 text-green-600 hover:bg-gray-100 text-left"
            >
              Done
            </button>
            <button
              onClick={() => handleStatusUpdate(req._id, "canceled")}
              className="px-3 py-2 text-red-600 hover:bg-gray-100 text-left"
            >
              Cancel
            </button>
          </>
        )}
    </div>
  )}
</td>

              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        {!maxItems && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className={`px-3 py-1 rounded border ${
                currentPage === 1 ? "opacity-40 cursor-not-allowed" : ""
              }`}
            >
              Prev
            </button>

            {[...Array(totalPages).keys()].map((num) => {
              const page = num + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded border ${
                    currentPage === page
                      ? "bg-red-600 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className={`px-3 py-1 rounded border ${
                currentPage === totalPages
                  ? "opacity-40 cursor-not-allowed"
                  : ""
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationRequestsTable;
