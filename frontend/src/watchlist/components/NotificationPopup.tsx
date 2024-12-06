import React from 'react';

interface ReminderNotificationProps {
  message: string;
  onClose: () => void;
}

const ReminderNotification: React.FC<ReminderNotificationProps> = ({ message, onClose }) => {
  return (
    <div className="fixed top-0 right-0 m-4 bg-red-600 text-white p-4 rounded shadow-lg z-50">
      <p>{message}</p>
      <button className="mt-2 bg-red-800 px-2 py-1 rounded" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default ReminderNotification;
