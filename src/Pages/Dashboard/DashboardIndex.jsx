// // import React, { useEffect, useState } from "react";
// // import useAxiosSecure from "../../hooks/useAxiosSecure";
// // // import DashboardHome from "./Donor/DashboardHome";
// // // import AdminDashboardHome from "./Admin/AdminDashboardHome";
// // import { toast } from "react-hot-toast";
// // import AdminDashboardHome from "./Admin/AdminDashboardHome";
// // import DashboardHome from "./Donor/DashboardHome";

// // const DashboardIndex = () => {
// //   const axiosSecure = useAxiosSecure();
// //   const [role, setRole] = useState(null);

// //   useEffect(() => {
// //     const fetchRole = async () => {
// //       try {
// //         const res = await axiosSecure.get("/users/role?email=" + localStorage.getItem("userEmail"));
// //         if (res.data.success) setRole(res.data.role);
// //       } catch (err) {
// //         console.error(err);
// //         toast.error("Failed to fetch user role");
// //       }
// //     };
// //     fetchRole();
// //   }, [axiosSecure]);

// //   if (!role) return <div className="p-6">Loading...</div>;

// //   // Show Admin dashboard or Donor dashboard
// //   return role === "admin" ? <AdminDashboardHome /> : <DashboardHome />;
// // };

// // export default DashboardIndex;
// import React, { useEffect, useState } from "react";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { toast } from "react-hot-toast";
// import useAuth from "../../hooks/useAuth"; // import your auth hook
// import AdminDashboardHome from "./Admin/AdminDashboardHome";
// import DashboardHome from "./Donor/DashboardHome";

// const DashboardIndex = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user, loading } = useAuth(); // get logged-in user
//   const [role, setRole] = useState(null);

//   useEffect(() => {
//     if (loading || !user?.email) return; // wait until user is loaded

//     const fetchRole = async () => {
//       try {
//         const res = await axiosSecure.get(`/users/role?email=${user.email}`);
//         if (res.data.success) setRole(res.data.role);
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to fetch user role");
//       }
//     };

//     fetchRole();
//   }, [axiosSecure, user, loading]);

//   if (!role) return <div className="p-6">Loading...</div>;

//   return role === "admin" ? <AdminDashboardHome /> : <DashboardHome />;
// };

// export default DashboardIndex;
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import AdminDashboardHome from "./Admin/AdminDashboardHome";
import DashboardHome from "./Donor/DashboardHome";
// import VolunterDashboardHome from "./Volunteer/VolunterDashboardHome";
import { Navigate } from "react-router"; // optional, for redirect if not logged in
import VolunterDashboardHome from "../VolunterDashboardHome/VolunterDashboardHome";

const DashboardIndex = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (loading) return; // wait until auth status is loaded
    if (!user?.email) return; // user not loaded

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
  if (!user) return <Navigate to="/login" replace />; // redirect if not logged in
  if (!role) return <div className="p-6">Loading role...</div>;

  // 3 Conditions: admin, donor, volunteer
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
