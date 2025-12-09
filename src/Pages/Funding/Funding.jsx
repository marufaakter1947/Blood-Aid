import React, { useEffect, useState } from "react";
import { FaDonate } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const Funding = () => {
  const { user } = useAuth(); 
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [amount, setAmount] = useState("");

  const fetchFunds = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/funding`);
      const data = await res.json();
      setFunds(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch funding data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFunds();

    // Handle Stripe success redirect
    const params = new URLSearchParams(window.location.search);
    const session_id = params.get("session_id");
    if (session_id) {

      fetch(`${import.meta.env.VITE_API_URL}/api/funding/confirm-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: session_id }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            toast.success("Payment successful!");
            fetchFunds();
            window.history.replaceState({}, document.title, window.location.pathname);
          } else {
            toast.error("Payment verification failed");
          }
        })
        .catch(() => toast.error("Payment verification failed"));
    }
  }, []);

  const totalFund = funds.reduce((sum, f) => sum + f.amount, 0);

  const handleGiveFund = async () => {
    const amt = Number(amount);
  if (!amt || amt <= 0) {
    toast.error("Please enter a valid amount");
    return;
  }
  if (amt < 60) { 
    toast.error("Amount must be at least 60 BDT");
    return;
  }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/funding/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: Number(amount),
            name: user?.name || "Anonymous",
            email: user?.email,
          }),
        }
      );
      const data = await response.json();
      if (data.url) window.location.href = data.url;
      else toast.error("Failed to create Stripe session");
    } catch (err) {
      console.error(err);
      toast.error("Payment initiation failed");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto pt-15">
      <Toaster position="top-right" />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-red-600">Funding</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 transition"
        >
          <FaDonate />
          Give Fund
        </button>
      </div>

      <div className="bg-red-50 border border-red-200 rounded p-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-700">Total Funds</h3>
        <p className="text-3xl font-bold text-red-600">৳ {totalFund}</p>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-3">Donor Name</th>
              <th className="text-left px-4 py-3">Amount (৳)</th>
              <th className="text-left px-4 py-3">Funding Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : funds.length > 0 ? (
              funds.map((fund, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{fund.name}</td>
                  <td className="px-4 py-3 font-semibold">৳ {fund.amount}</td>
                  <td className="px-4 py-3">{fund.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">
                  No funding data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h3 className="text-lg font-bold mb-4">Enter Amount (BDT)</h3>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-4"
              placeholder="Amount in BDT"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setModalOpen(false);
                  handleGiveFund();
                }}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Funding;
