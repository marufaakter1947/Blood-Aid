import useAuth from "../../../hooks/useAuth";
import DonationRequestsTable from "../../DonationRequests/DonationRequestsTable";
import { Link } from "react-router";

const DashboardHome = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">
        Welcome, <span className="text-red-600">{user.displayName}</span> 👋
      </h2>

     
      <DonationRequestsTable
        fetchAll={false}
        title="My Recent Donation Requests"
        maxItems={3}
      />

      <div className="text-right mt-4">
        <Link
          to="/dashboard/my-donation-requests"
          className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-medium"
        >
          View My All Requests →
        </Link>
      </div>
    </div>
  );
};

export default DashboardHome;
