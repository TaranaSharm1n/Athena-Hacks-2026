"use client";
import React, { useState } from "react";

interface TimerPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (minutes: number) => void;
}

const TimerPopup: React.FC<TimerPopupProps> = ({ isOpen, onClose, onConfirm }) => {
  const [selectedMinutes, setSelectedMinutes] = useState(30);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(selectedMinutes);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-slate-900 p-6 rounded-xl flex flex-col items-center">
        <h2 className="text-white mb-4">Select Work Duration</h2>
        <select
          value={selectedMinutes}
          onChange={(e) => setSelectedMinutes(Number(e.target.value))}
          className="mb-4 p-2 rounded bg-gray-700 text-white"
        >
          {Array.from({ length: 8 }, (_, i) => (i + 1) * 30).map((minutes) => (
            <option key={minutes} value={minutes}>
              {minutes} minutes
            </option>
          ))}
        </select>
        <div className="flex gap-4">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleConfirm}
          >
            Confirm
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerPopup;