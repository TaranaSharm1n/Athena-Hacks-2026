"use client";
import React, { useState, useEffect, useRef } from "react";

interface TimerProps {
  durationMinutes: number; // Duration set by user
  start: boolean;          // Whether to start counting
}

const Timer: React.FC<TimerProps> = ({ durationMinutes, start }) => {
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

  const clickSfx = useRef<HTMLAudioElement | null>(null);
  const endTaskSfx = useRef<HTMLAudioElement | null>(null);


  useEffect(() => {
    const audio = new Audio("/dragon-studio-button-press-382713.mp3");
    audio.preload = "auto";
    audio.volume = 0.4;
    clickSfx.current = audio;
    const audio2 = new Audio("/dragon-studio-notification-ping.mp3");
    audio2.preload = "auto";
    audio2.volume = 0.4;
    endTaskSfx.current = audio2;
  }, []);

  const playClickSound = () => {
    if (clickSfx.current) {
      clickSfx.current.currentTime = 0; 
      clickSfx.current.play();          
    }
  };

  const playEndTaskSound = () => {
    if (endTaskSfx.current) {
      endTaskSfx.current.currentTime = 0; 
      endTaskSfx.current.play();          
    }
  };

  const toggleTimer = () => {
    if(isRunning){
      playEndTaskSound();
    } else {
      playClickSound();
    }
    setIsRunning(prev => !prev);
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
      if(seconds >= durationMinutes * 60){
        playEndTaskSound();
        resetTimer();
      }
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
    <div>
      <button
          className="absolute -top-4 right-2 bg-slate-500 text-white px-3 py-1 rounded-xl hover:bg-slate-600"
          onClick={toggleTimer}
        >
            Toggle
      </button>
    <div className="flex flex-col items-center justify-center p-6 bg-slate-950 rounded-xl w-64 mx-auto">
      <div className="text-4xl font-bitcount-grid-double text-slate-100">
        {formatTime(seconds)}
      </div>
      
    </div>
    
    </div>
  );
};

export default Timer;