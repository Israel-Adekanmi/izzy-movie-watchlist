// hooks/useReminderNotifications.ts
import { useEffect, useState } from 'react';
import { Reminder } from '../watchlist/type';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useReminderNotifications = () => {
  const [showReminder, setShowReminder] = useState(false); // State to control the popup visibility
  const [reminderMessage, setReminderMessage] = useState(''); // Message to show in the popup
  const token = localStorage.getItem("accessToken"); // Fetch the token

  useEffect(() => {
    const checkReminders = async () => {
      // Fetch reminders and check if any are due
      const response = await fetch(`${BASE_URL}/get-reminders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      // Check if there are reminders due
      const now = new Date();
      data.data.forEach((reminder: Reminder) => {
        const reminderTime = new Date(reminder.reminderTime);
        if (reminderTime <= now && !reminder.isSent) {
          setShowReminder(true);
          setReminderMessage(`Reminder for ${reminder.movieTitle} is due!`);
          // Optionally, send a notification to the backend to mark as sent
        }
      });
    };

    if (token) {
      checkReminders();
    }
  }, [token]);

  return { showReminder, setShowReminder, reminderMessage };
};

export default useReminderNotifications;
