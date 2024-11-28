/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import Toast from '../components/toast';

interface ForgotPasswordModalProps {
  onClose: () => void;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success'; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.error) {
        setFeedback({ type: 'error', message: data.message });
      } else {
        setFeedback({ type: 'success', message: 'Check your email for password reset instructions.' });
        setTimeout(() => {
          onClose(); // Close the modal after success
        }, 2000);
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Something went wrong' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
        {feedback && (
          <Toast
            type={feedback.type}
            message={feedback.message}
            onClose={() => setFeedback(null)}
          />
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-black" >Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Password'}
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-gray-500 hover:underline">
          Close
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
