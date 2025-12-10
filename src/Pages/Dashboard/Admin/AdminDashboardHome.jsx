import React, { useEffect, useState } from "react";
import { FaUsers, FaDonate, FaHandHoldingMedical } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

   const [totalUsers, setTotalUsers] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);
  const [totalFunds, setTotalFunds] = useState(0);


   useEffect(() => {
    const fetchStats = async () => {
      try {
        //Users
        const usersRes = await axiosSecure.get("/admin/users");
        setTotalUsers(usersRes.data.length);

        //Donation Requests
        const requestsRes = await axiosSecure.get("/admin/donation-requests/count");
        setTotalRequests(requestsRes.data.count);

        // Funds
        const fundsRes = await axiosSecure.get("/api/funding/total");
        setTotalFunds(fundsRes.data.total);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, [axiosSecure]);

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-2xl font-bold text-red-600">
          Welcome, Admin! 🏠
        </h2>
        <p className="mt-2 text-gray-600">
          Here's a quick overview of your Blood Aid platform.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Users */}
        <div className="bg-white shadow p-6 rounded flex items-center gap-4">
          <FaUsers className="text-red-600 text-3xl" />
          <div>
            <p className="text-2xl font-bold">{totalUsers}</p>
            <p className="text-gray-600">Total Users</p>
          </div>
        </div>

        {/* Total Donation Requests */}
        <div className="bg-white shadow p-6 rounded flex items-center gap-4">
          <FaHandHoldingMedical className="text-red-600 text-3xl" />
          <div>
            <p className="text-2xl font-bold">{totalRequests}</p>
            <p className="text-gray-600">Blood Donation Requests</p>
          </div>
        </div>

        {/* Total Funds */}
        <div className="bg-white shadow p-6 rounded flex items-center gap-4">
          <FaDonate className="text-red-600 text-3xl" />
          <div>
            <p className="text-2xl font-bold">৳ {totalFunds}</p>
            <p className="text-gray-600">Total Funding</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
