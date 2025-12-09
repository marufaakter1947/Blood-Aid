import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import AdminDashboardHome from "./Admin/AdminDashboardHome";
import DashboardHome from "./Donor/DashboardHome";
import { Navigate } from "react-router"; 
import VolunterDashboardHome from "../VolunterDashboardHome/VolunterDashboardHome";

const DashboardIndex = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (loading) return; 
    if (!user?.email) return; 

    const fetchRole = async () => {
      try {
        const res = await axiosSecure.get(`/users/role?email=${user.email}`);
        if (res.data.success) setRole(res.data.role);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch user role");
      }
    };

    fetchRole();
  }, [axiosSecure, user, loading]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />; 
  if (!role) return <div className="p-6">Loading role...</div>;

  
  switch (role) {
    case "admin":
      return <AdminDashboardHome />;
    case "donor":
      return <DashboardHome />;
    case "volunteer":
      return <VolunterDashboardHome />;
    default:
      return <div className="p-6 text-center">Unauthorized</div>;
  }
};

export default DashboardIndex;
