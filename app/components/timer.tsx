"use client";
import React, { useState, useEffect, useRef } from "react";

const Timer: React.FC = () => {
    const [seconds, setSeconds] = useState(0);

  // Interval ref (browser-safe)
  const intervalRef = useRef<number | null>(null);

  // Start the timer
  const startTimer = () => {
    if (intervalRef.current !== null) return; // prevent multiple intervals
    intervalRef.current = window.setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  // Pause the timer
  const pauseTimer = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Reset the timer
  const resetTimer = () => {
    pauseTimer();
    setSeconds(0);
  };

  

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, []);

  // Format seconds into HH:MM:SS
  const formatTime = (sec: number) => {
    const h = Math.floor(sec / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((sec % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded shadow-md w-64 mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Timer</h1>
      <div className="text-2xl font-mono text-gray-700 mb-6">
        {formatTime(seconds)}
      </div>
      <div className="flex gap-2">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={startTimer}
        >
          Start
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          onClick={pauseTimer}
        >
          Pause
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;