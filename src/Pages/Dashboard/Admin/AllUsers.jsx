import { useEffect, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { toast } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ITEMS_PER_PAGE = 4;

const AllUsers = () => {
  const { token } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [users, setUsers] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [openMenu, setOpenMenu] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (token) fetchUsers();
  }, [token]);

  const fetchUsers = async () => {
    try {
      const res = await axiosSecure.get("/admin/users");
      setUsers(res.data);
    } catch {
      toast.error("Failed to load users");
    }
  };
// actions
  const updateRole = async (email, role) => {
    try {
      await axiosSecure.patch("/admin/role", { email, role });
      toast.success(`Role updated to ${role}`);
      setOpenMenu(null);
      fetchUsers();
    } catch {
      toast.error("Failed to update role");
    }
  };

  const updateStatus = async (email, status) => {
    try {
      await axiosSecure.patch("/admin/status", { email, status });
      toast.success(`User ${status}`);
      setOpenMenu(null);
      fetchUsers();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const filteredUsers =
    statusFilter === "all"
      ? users
      : users.filter((u) => u.status === statusFilter);

    //   pagination
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-red-600">All Users</h2>

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-3 py-2 rounded max-w-xs"
        >
          <option value="all">All Users</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-center">Role</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                {/* User */}
                <td className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={user.avatar || "https://i.ibb.co/4pDNDk1/avatar.png"}
                    onError={(e) =>
                      (e.target.src = "https://i.ibb.co/4pDNDk1/avatar.png")
                    }
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <div>
                    <p className="font-medium">{user.name || "Unnamed User"}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </td>

                <td className="px-4 py-3 text-center capitalize">
                  {user.role}
                </td>

                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      user.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-right relative">
                  <button
                    onClick={() =>
                      setOpenMenu(openMenu === user._id ? null : user._id)
                    }
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <FiMoreVertical />
                  </button>

                  {openMenu === user._id && (
                    <div className="absolute right-3 mt-2 w-48 bg-white border rounded shadow z-50">
                      {user.status === "active" ? (
                        <button
                          onClick={() =>
                            updateStatus(user.email, "blocked")
                          }
                          className="dropdown-btn"
                        >
                          Block User
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            updateStatus(user.email, "active")
                          }
                          className="dropdown-btn"
                        >
                          Unblock User
                        </button>
                      )}

                      {user.role === "donor" && (
                        <button
                          onClick={() =>
                            updateRole(user.email, "volunteer")
                          }
                          className="dropdown-btn"
                        >
                          Make Volunteer
                        </button>
                      )}

                      {user.role !== "admin" && (
                        <button
                          onClick={() => updateRole(user.email, "admin")}
                          className="dropdown-btn"
                        >
                          Make Admin
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}

            {paginatedUsers.length === 0 && (
              <tr>
                <td colSpan="4" className="py-6 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Prev
          </button>

          {[...Array(totalPages).keys()].map((n) => (
            <button
              key={n}
              onClick={() => setCurrentPage(n + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === n + 1
                  ? "bg-red-500 text-white"
                  : ""
              }`}
            >
              {n + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
