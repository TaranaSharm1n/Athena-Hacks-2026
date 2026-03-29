"use client";
import React, { useState } from "react";

interface TimerPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (taskName: string, plantTypeId: string, minutes: number) => void;
}

const TimerPopup: React.FC<TimerPopupProps> = ({ isOpen, onClose, onConfirm }) => {
  const [selectedMinutes, setSelectedMinutes] = useState(30);
  const [taskName, setTaskName] = useState("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!taskName.trim()) return // don't allow empty name
    onConfirm(taskName, "cherry-blossoms", selectedMinutes);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-slate-900 p-6 rounded-xl flex flex-col items-center gap-4">
        <h2 className="text-white text-lg font-semibold">New Study Session</h2>
        
        <input
          type="text"
          placeholder = "What are you working on?"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
        />

        <select
          value={selectedMinutes}
          onChange={(e) => setSelectedMinutes(Number(e.target.value))}
          className="w-full p-2 rounded bg-gray-700 text-white"
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