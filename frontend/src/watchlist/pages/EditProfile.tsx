/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import Toast from "../components/toast";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EditProfile: React.FC = () => {
  const navigate = useNavigate();

  // States for profile data
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);

  const token = localStorage.getItem("accessToken");

  // Redirect to login if there's no token
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Handle form submission to update the profile
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const profileData = { firstName, lastName, currentPassword, newPassword };

    try {
      const response = await fetch(`${BASE_URL}/update-profile`, {
        method: "PUT", // Use PUT for updating data
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (data.error) {
        setFeedback({ type: "error", message: data.message });
      } else {
        setFeedback({ type: "success", message: data.message });
        setTimeout(() => {
            navigate("/"); // Navigate to home page
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
    <div className="flex flex-col bg-black">
      <div className="flex gap-5 max-md:flex-col">
        <Sidebar />
        {/* Sidebar */}

        {/* Main Content */}
        <main className="flex-1 text-white flex items-center mt-4 w-full justify-center px-8 bg-stone-900">
          <div className="w-full max-w-md">
            <h1 className="text-3xl mt-4 font-semibold mb-4">Edit Profile</h1>

            {/* Toast for feedback */}
            {feedback && (
              <Toast
                type={feedback.type}
                message={feedback.message}
                onClose={() => setFeedback(null)}
              />
            )}

            {/* Edit Profile Form */}
            <form className="space-y-6 mb-6" onSubmit={handleSubmit}>
              {/* First Name Field */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-2 bg-black border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Last Name Field */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-2 bg-black border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Current Password Field */}
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium mb-2">
                  Current Password *
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-black border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* New Password Field */}
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium mb-2">
                  New Password *
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-black border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-6 py-3 bg-red-500 text-black font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditProfile;
