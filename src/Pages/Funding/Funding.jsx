import React, { useState } from "react";
import { FaDonate } from "react-icons/fa";

const Funding = () => {
  // demo state (later backend theke ashbe)
  const [funds] = useState([
    {
      id: 1,
      name: "Nasim Abdullah",
      amount: 500,
      date: "2025-12-08",
    },
    {
      id: 2,
      name: "Tina Akter",
      amount: 1000,
      date: "2025-12-07",
    },
  ]);

  const totalFund = funds.reduce((sum, f) => sum + f.amount, 0);

  const handleGiveFund = () => {
    // 🔜 Stripe modal / redirect ekhane integrate korba
    console.log("Redirect to Stripe payment");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto pt-15">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-red-600">Funding</h2>

        <button
          onClick={handleGiveFund}
          className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 transition"
        >
          <FaDonate />
          Give Fund
        </button>
      </div>

      {/* Summary Card */}
      <div className="bg-red-50 border border-red-200 rounded p-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-700">Total Funds</h3>
        <p className="text-3xl font-bold text-red-600">৳ {totalFund}</p>
      </div>

      {/* Table */}
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
            {funds.map((fund) => (
              <tr
                key={fund.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">{fund.name}</td>
                <td className="px-4 py-3 font-semibold">
                  ৳ {fund.amount}
                </td>
                <td className="px-4 py-3">{fund.date}</td>
              </tr>
            ))}

            {funds.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">
                  No funding data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Funding;
