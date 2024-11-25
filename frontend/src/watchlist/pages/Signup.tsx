/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Toast from "../components/toast";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const [feedback, setFeedback] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // console.log('form data', formData);
    try {
      const response = await fetch(`${BASE_URL}/signup`, {
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
        setFeedback({
          type: "success",
          message: "Profile created successfully!, Redirecting to Login",
        });
        // Redirect to the login page after a short delay
        setTimeout(() => {
          navigate("/login");
        }, 1500);
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
        <main className="flex-1 flex items-center justify-center px-8 bg-stone-900">
          {/* Toast Feedback */}
          {feedback && (
            <Toast
              type={feedback.type}
              message={feedback.message}
              onClose={() => setFeedback(null)}
            />
          )}

          <div className="w-full mt-4 max-w-md">
            <h1 className="text-3xl font-semibold mb-4">Hello!</h1>
            <p className="mb-6">
              Please log in or create an account to use the features of this
              app.
            </p>

            {/* Sign-Up Form */}
            <form className="space-y-6 mb-7" onSubmit={handleSubmit}>
              {/* First Name Field */}
              <div>
                <label
                  htmlFor="First Name"
                  className="block text-sm font-medium mb-2"
                >
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-black border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* First Name Field */}
              <div>
                <label
                  htmlFor="Last Name"
                  className="block text-sm font-medium mb-2"
                >
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-black border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Gender Dropdown */}
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium mb-2"
                >
                  Gender *
                </label>
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-black border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

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

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-2"
                >
                  Confirm Password *
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
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
                {loading ? "Creating Profile..." : "Create Profile"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SignupPage;
