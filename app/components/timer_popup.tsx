// components/WorkTimerPopup.tsx
"use client";
import React, { useState } from "react";

interface WorkTimerPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (minutes: number) => void; // Callback with selected duration
  title?: string;
}

const WorkTimerPopup: React.FC<WorkTimerPopupProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Select Work Duration",
}) => {
  const [selectedMinutes, setSelectedMinutes] = useState(30);

  if (!isOpen) return null;

  // Generate increments of 30 min up to 8 hours (480 min)
  const options = Array.from({ length: 16 }, (_, i) => (i + 1) * 30);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-lg w-11/12 max-w-md p-6 relative">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        {/* Dropdown */}
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">Duration:</label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={selectedMinutes}
            onChange={(e) => setSelectedMinutes(Number(e.target.value))}
          >
            {options.map((minutes) => (
              <option key={minutes} value={minutes}>
                {Math.floor(minutes / 60) > 0
                  ? `${Math.floor(minutes / 60)}h ${minutes % 60}m`
                  : `${minutes} min`}
              </option>
            ))}
          </select>
        </div>

        {/* Confirm button */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          onClick={() => {
            onConfirm(selectedMinutes);
            onClose();
          }}
        >
          Start Timer
        </button>
      </div>
    </div>
  );
};

export default WorkTimerPopup;