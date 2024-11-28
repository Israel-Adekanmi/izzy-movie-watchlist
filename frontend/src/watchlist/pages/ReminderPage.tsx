/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import Toast from "../components/toast";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const formatDateAndTime = (
  dateTime: string
): { date: string; time: string } => {
  const dateObj = new Date(dateTime);

  const date = dateObj.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }); // Format as DD/MM/YYYY or modify as needed.

  const time = dateObj.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  }); // Format as HH:MM (24-hour format).

  return { date, time };
};

const ReminderPage: React.FC = () => {
  const navigate = useNavigate();
  const [reminders, setReminders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [feedback, setFeedback] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchReminders = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/get-reminders`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (data.error) {
          throw new Error(data.message);
        }

        setReminders(data.data || []);
      } catch (err: any) {
        setFeedback({
          type: "error",
          message: err.message || "Error fetching reminders.",
        });
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchReminders();
    }
  }, [token]);


  return (
    <div className="flex flex-col bg-black">
      <div className="flex gap-5 max-md:flex-col">
        <Sidebar />
        {/* Main Content */}
        <section className="flex flex-col ml-5 w-[81%] max-md:ml-0 max-md:w-full">
          {/* Toast for feedback */}
          {feedback && (
            <Toast
              type={feedback.type}
              message={feedback.message}
              onClose={() => setFeedback(null)}
            />
          )}

          <div className="flex flex-col py-9 pr-16 pl-8 mx-auto w-full bg-white bg-opacity-10 max-md:px-5 max-md:mt-10 max-md:max-w-full">
            <h1 className="text-3xl font-semibold mb-6 text-white">
              Reminder Details
            </h1>

            {/* Loading Spinner */}
            {loading ? (
              <p className="text-center text-white">Loading reminders...</p>
            ) : reminders.length === 0 ? (
              <p className="text-center text-white">No reminders available.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-white border-collapse border border-gray-700">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="border border-gray-700 px-4 py-2 text-left">
                        Movie Title
                      </th>
                      <th className="border border-gray-700 px-4 py-2 text-left">
                        Reminder Date
                      </th>
                      <th className="border border-gray-700 px-4 py-2 text-left">
                        Reminder Time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reminders.map((reminder: any, index: number) => {
                      const { date, time } = formatDateAndTime(
                        reminder.reminderTime
                      );
                      return (
                        <tr
                          key={index}
                          className="hover:bg-gray-700 cursor-pointer"
                          onClick={() =>
                            navigate(`/movie-details/${reminder.movieId}`)
                          }
                        >
                          <td className="border border-gray-600 px-4 py-2 text-center text-white">
                            {reminder.movieTitle}
                          </td>
                          <td className="border border-gray-600 px-4 py-2 text-center text-white">
                            {date}
                          </td>
                          <td className="border border-gray-600 px-4 py-2 text-center text-white">
                            {time}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReminderPage;
