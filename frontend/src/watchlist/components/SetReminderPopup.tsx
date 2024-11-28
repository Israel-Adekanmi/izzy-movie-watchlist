/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Toast from "./toast"; // Ensure you have a Toast component for feedback
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface SetReminderPopupProps {
  movieId: number;
  movieTitle: string,
  onClose: () => void; // To close the popup
}

const SetReminderPopup: React.FC<SetReminderPopupProps> = ({
    movieId,
    movieTitle,
  onClose,
}) => {
  const [reminderTime, setReminderTime] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const token = localStorage.getItem("accessToken");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reminderTime) {
      setFeedback({
        type: "error",
        message: "Please specify a valid reminder time.",
      });
      return;
    }

    // console.log(reminderTime);

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/set-reminder`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        body: JSON.stringify({ movieId, reminderTime }),
      });

      const data = await response.json();
      if (data.error) {
        // throw new Error(data.message);
        setFeedback({
            type: "error",
            message: data.message,
          });
      }

      setFeedback({
        type: "success",
        message: "Reminder set successfully!",
      });

      // Close the popup after a brief delay
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error: any) {
      setFeedback({
        type: "error",
        message: error.message || "Failed to set reminder.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center z-50 justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {/* Toast for feedback */}
        {feedback && (
          <Toast
            type={feedback.type}
            message={feedback.message}
            onClose={() => setFeedback(null)}
          />
        )}

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Set Reminder for "{movieTitle}"
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="reminderTime"
              className="block text-sm font-medium text-gray-700"
            >
              Reminder Time (Date & Time)
            </label>
            <input
              type="datetime-local"
              id="reminderTime"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Setting..." : "Set Reminder"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetReminderPopup;
