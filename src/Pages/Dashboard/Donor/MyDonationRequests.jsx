import React, { useEffect, useState } from 'react';
import DonationRequestsTable from '../../DonationRequests/DonationRequestsTable';
import useAuth from '../../../hooks/useAuth';
import { getAuth } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '../../../Component/Shared/LoadingSpinner';

const MyDonationRequests = () => {
  const { user } = useAuth();
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const [myRequests, setMyRequests] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    const fetchUser = async () => {
      try {
        const auth = getAuth();
        const token = await auth.currentUser.getIdToken();
// login user
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch user');

        const data = await res.json();
        setDbUser(data);
      } catch (err) {
        console.error(err);
        toast.error('Failed to fetch user info');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user]);

  useEffect(() => {
    const fetchMyRequests = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/donation-requests/my-requests?email=${user?.email}`
        );

        const data = await res.json();
        setMyRequests(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (user?.email) fetchMyRequests();
  }, [user]);

  if (loading) return <LoadingSpinner />;

  if (dbUser?.status === 'blocked') {
    return (
      <div className="p-6 bg-red-100 text-red-700 rounded text-center">
        <h2 className="text-xl font-bold">
          You are blocked! You cannot view your donation requests.
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">

      {/* show message if users have no  request  */}
      {myRequests.length === 0 ? (
        <div className="p-6 bg-gray-100 text-gray-700 rounded text-center">
          <h2 className="text-lg font-semibold">
            You have not created any donation request yet.
          </h2>
        </div>
      ) : (
        <DonationRequestsTable fetchAll={false} />
      )}

    </div>
  );
};

export default MyDonationRequests;
