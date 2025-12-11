import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { signIn, loading } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      setUploading(true);
      await signIn(email, password);
      toast.success("Login Successful");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Invalid email or password");
    } finally {
      setUploading(false);
    }
  };
  if (user) return <Navigate to="/dashboard" replace />;


  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-lg p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-4">
          LogIn Now
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Email */}
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="w-full input"
          />

          {/* Password */}
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              className="w-full input pr-10"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </span>
          </div>

          <button
            disabled={loading || uploading}
            className="w-full bg-linear-to-r from-[#BC1823] to-[#66080e] text-white py-2 rounded hover:bg-red-700 transition cursor-pointer"
          >
            {uploading ? "Logging in..." : "Login"}
          </button>


          <p className="text-center font-semibold mt-2 text-gray-700">
            Don't have an account?{" "}
            <Link
              className="text-[#BC1823] hover:text-red-900 hover:underline cursor-pointer"
              to="/registration"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
