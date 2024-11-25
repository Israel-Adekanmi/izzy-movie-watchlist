import React, { useEffect } from "react";

interface ToastProps {
  type: "error" | "success";
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ type, message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
          onClose();
        }, 3000); // Auto close the toast after 3 seconds
    
        return () => clearTimeout(timer);
      }, [onClose]);
    
  return (
    <div
      className={`fixed top-5 right-5 z-50 p-4 rounded-md text-white shadow-lg ${
        type === "error" ? "bg-red-600" : "bg-green-600"
      }`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 bg-transparent text-white focus:outline-none"
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default Toast;
