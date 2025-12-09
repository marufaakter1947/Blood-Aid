import useAuth from "../../../hooks/useAuth";
import DonationRequestsTable from "../../DonationRequests/DonationRequestsTable";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import axios from "axios";

const DashboardHome = () => {
  const { user } = useAuth();
   const axiosSecure = useAxiosSecure();
  const [recentRequests, setRecentRequests] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    const fetchRecentRequests = async () => {
      try {
        // const token = await user.getIdToken();
         const res = await axiosSecure.get("/donation-requests/my");

        // Sort by most recent and get maximum 3
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setRecentRequests(sorted.slice(0, 3));
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecentRequests();
  }, [user,axiosSecure]);

  if (!user) return null;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">
        Welcome, <span className="text-red-600">{user.displayName}</span> 👋
      </h2>

      {recentRequests.length > 0 && (
        <DonationRequestsTable
          fetchAll={false}
          title="My Recent Donation Requests"
          maxItems={3}
        />
      )}

      {/* Conditionally render button if more than 3 requests exist */}
      {recentRequests.length > 3 && (
        <div className="text-right mt-4">
          <Link
            to="/dashboard/my-donation-requests"
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-medium"
          >
            View My All Requests →
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
