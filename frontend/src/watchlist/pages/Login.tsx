/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import Toast from "../components/toast";
import ForgotPasswordModal from "../components/ForgotPasswordPopUp";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const GuestLogin: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.error) {
        setFeedback({ type: "error", message: data.message });
      } else {
        setFeedback({ type: "success", message: "Login successful!" });

        // Store the token in localStorage
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("authUser", JSON.stringify(data.data.user));

        // Redirect to the homepage
        setTimeout(() => navigate("/"), 1500);
      }
    } catch (err: any) {
      setFeedback({
        type: "error",
        message: err.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-black text-white">
      <div className="flex gap-5 max-md:flex-col">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 flex items-center bg-stone-900 justify-center px-8">
          {/* Toast for feedback */}
          {feedback && (
            <Toast
              type={feedback.type}
              message={feedback.message}
              onClose={() => setFeedback(null)}
            />
          )}

          <div className="mt-4 w-full max-w-md">
            <h1 className="text-3xl font-semibold mb-4">Hello!</h1>
            <p className="mb-6">
              Please log in or create an account to use the features of this
              app.
            </p>

            {/* Log-In Form */}
            <form className="space-y-6 mb-7" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-black border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-2"
                >
                  Password *
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-black border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-6 py-3 bg-red-500 text-black font-semibold rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-500"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </form>

            <p className="mt-4 text-center">
              or{" "}
              <a
                onClick={() => navigate("/signup")}
                className="text-red-500 hover:underline"
              >
                create an account
              </a>
            </p>

            {/* Forgot Password Link */}
            <p className="mt-4 text-center">
              <button
                onClick={() => setShowModal(true)} // Show the modal when clicked
                className="text-red-500 hover:underline"
              >
                Forgot Password?
              </button>
            </p>
          </div>
        </main>
      </div>

      {/* Forgot Password Modal */}
      {showModal && <ForgotPasswordModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default GuestLogin;
