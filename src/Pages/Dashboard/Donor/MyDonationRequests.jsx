import React from 'react';
import DonationRequestsTable from '../../DonationRequests/DonationRequestsTable';

const MyDonationRequests = () => {
    return (
        <div>
            <DonationRequestsTable fetchAll={false}></DonationRequestsTable>
        </div>
    );
};

export default MyDonationRequests;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import useAuth from "../../../hooks/useAuth";
// import { toast } from "react-hot-toast";
// import { Link } from "react-router";
// import Swal from "sweetalert2";


// const statusOptions = ["all", "pending", "inprogress", "done", "canceled"];
// const ITEMS_PER_PAGE = 4;

// const MyDonationRequests = () => {
//   const { user } = useAuth();
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filterStatus, setFilterStatus] = useState("all");

//   // pagination state
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const token = await user.getIdToken();
//         const res = await axios.get(
//           `${import.meta.env.VITE_API_URL}/donation-requests/my?email=${user.email}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setRequests(res.data);
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to load donation requests");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user?.email) {
//       fetchRequests();
//     }
//   }, [user]);

//   /** ✅ Filtering */
//   const filteredRequests =
//     filterStatus === "all"
//       ? requests
//       : requests.filter((req) => req.status === filterStatus);

//   /** ✅ Pagination calculation */
//   const totalPages = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE);
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const currentItems = filteredRequests.slice(
//     startIndex,
//     startIndex + ITEMS_PER_PAGE
//   );

//   /** ✅ Reset page when filter changes */
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [filterStatus]);
  

//   const handleDelete = async (id) => {
//   const result = await Swal.fire({
//     title: "Are you sure?",
//     text: "This donation request will be permanently deleted!",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#dc2626",
//     cancelButtonColor: "#6b7280",
//     confirmButtonText: "Yes, delete it!",
//   });

//   if (!result.isConfirmed) return;

//   try {
//     const token = await user.getIdToken();

//     await axios.delete(
//       `${import.meta.env.VITE_API_URL}/donation-requests/${id}`,
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     // ✅ UI update
//     setRequests((prev) => prev.filter((r) => r._id !== id));

//     Swal.fire({
//       icon: "success",
//       title: "Deleted!",
//       text: "Donation request has been deleted.",
//       timer: 1500,
//       showConfirmButton: false,
//     });
//   } catch (error) {
//     Swal.fire({
//       icon: "error",
//       title: "Oops!",
//       text: "Failed to delete donation request.",
//     });
//   }
// };


//   if (loading) return <div className="p-6">Loading...</div>;
//   if (!requests.length) return null;

//   return (
//     <div className="p-6">
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
//         <h2 className="text-xl font-bold text-red-600">
//           My Donation Requests
//         </h2>

//         {/* Filter */}
//         <select
//           value={filterStatus}
//           onChange={(e) => setFilterStatus(e.target.value)}
//           className="mt-2 md:mt-0 border rounded px-3 py-1"
//         >
//           {statusOptions.map((status) => (
//             <option key={status} value={status}>
//               {status.toUpperCase()}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* ✅ Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full border">
//           <thead className="bg-gray-100 text-sm">
//             <tr>
//               <th className="border px-3 py-2">Recipient</th>
//               <th className="border px-3 py-2">Location</th>
//               <th className="border px-3 py-2">Date</th>
//               <th className="border px-3 py-2">Time</th>
//               <th className="border px-3 py-2">Blood</th>
//               <th className="border px-3 py-2">Status</th>
//               <th className="border px-3 py-2">Donor Info</th>
//               <th className="border px-3 py-2">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {currentItems.map((req) => (
//               <tr key={req._id} className="text-sm text-center">
//                 <td className="border px-3 py-2">{req.recipientName}</td>
//                 <td className="border px-3 py-2">
//                   {req.recipientDistrict}, {req.recipientUpazila}
//                 </td>
//                 <td className="border px-3 py-2">{req.donationDate}</td>
//                 <td className="border px-3 py-2">{req.donationTime}</td>
//                 <td className="border px-3 py-2 font-semibold">
//                   {req.bloodGroup}
//                 </td>
//                 <td className="border px-3 py-2 capitalize">{req.status}</td>
//                 <td className="border px-3 py-2">
//                   {req.status === "inprogress" && req.donorInfo ? (
//                     <>
//                       <p>{req.donorInfo.name}</p>
//                       <p className="text-xs text-gray-500">
//                         {req.donorInfo.email}
//                       </p>
//                     </>
//                   ) : (
//                     "-"
//                   )}
//                 </td>
//                <td className="border px-3 py-2 space-x-1">
//   <Link
//     to={`/dashboard/donation-request/${req._id}`}
//     className="text-blue-600 hover:underline"
//   >
//     View
//   </Link>

//   <Link
//     to={`/dashboard/edit-request/${req._id}`}
//     className="text-green-600 hover:underline"
//   >
//     Edit
//   </Link>

//   <button
//     onClick={() => handleDelete(req._id)}
//     className="text-red-600 hover:underline"
//   >
//     Delete
//   </button>
// </td>

//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* ✅ Pagination UI */}
//       {totalPages > 1 && (
//         <div className="flex justify-center items-center gap-2 mt-6">
//           <button
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((p) => p - 1)}
//             className={`px-3 py-1 rounded border 
//               ${currentPage === 1 ? "opacity-40 cursor-not-allowed" : ""}`}
//           >
//             Prev
//           </button>

//           {[...Array(totalPages).keys()].map((num) => {
//             const page = num + 1;
//             return (
//               <button
//                 key={page}
//                 onClick={() => setCurrentPage(page)}
//                 className={`px-3 py-1 rounded border 
//                   ${
//                     currentPage === page
//                       ? "bg-red-600 text-white"
//                       : "hover:bg-gray-100"
//                   }`}
//               >
//                 {page}
//               </button>
//             );
//           })}

//           <button
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage((p) => p + 1)}
//             className={`px-3 py-1 rounded border 
//               ${currentPage === totalPages ? "opacity-40 cursor-not-allowed" : ""}`}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyDonationRequests;
