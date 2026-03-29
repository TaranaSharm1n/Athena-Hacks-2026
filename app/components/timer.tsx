"use client";
import React, { useState, useEffect, useRef } from "react";

const Timer: React.FC = () => {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);

  const startTimer = () => {
    if (intervalRef.current !== null) return; // prevent multiple intervals
    intervalRef.current = window.setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  const toggleTimer = () => {
    setIsRunning(prev => !prev);
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // Cleanup on unmount
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

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
    <div className="flex flex-col items-center justify-center p-6 bg-slate-950 rounded-xl w-64 mx-auto">
      <div className="text-2xl font-bitcount-grid-double text-slate-100 mb-6">
        {formatTime(seconds)}
      </div>
      <div className="flex gap-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={toggleTimer}
        >
            Toggle On/Off
            
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