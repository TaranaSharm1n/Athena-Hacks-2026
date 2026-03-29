"use client";
import React, { useState, useEffect, useRef } from "react";
import TimerPopup from "./timer_popup";

interface TimerProps {
  durationMinutes: number;
}

const Timer: React.FC<TimerProps> = ({ durationMinutes }) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const intervalRef = useRef<number | null>(null);

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
    if (!hasStarted) {
      // first click opens popup
      setIsPopupOpen(true);
    } else {
      // subsequent clicks pause/resume
      if (isRunning) playEndTaskSound();
      else playClickSound();
      setIsRunning((prev) => !prev);
    }
  };

  const handlePopupConfirm = () => {
    setIsPopupOpen(false);
    setHasStarted(true);
    setIsRunning(true);
    playClickSound();
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
      if (seconds >= durationMinutes * 60) {
        playEndTaskSound();
        setIsRunning(false);
        setSeconds(0);
      }
    } else {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, [isRunning, seconds, durationMinutes]);

  const formatTime = (sec: number) => {
    const h = Math.floor(sec / 3600).toString().padStart(2, "0");
    const m = Math.floor((sec % 3600) / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div>
      <button
        className="absolute -top-4 right-2 bg-slate-500 text-white px-3 py-1 rounded-xl hover:bg-slate-600"
        onClick={toggleTimer}
      >
        {hasStarted ? (isRunning ? "Pause" : "Resume") : "Set Timer"}
      </button>

      <div className="flex flex-col items-center justify-center p-6 bg-slate-950 border-8 border-slate-600 rounded-xl w-64 mx-auto">
        <div className="text-4xl font-bitcount-grid-double text-slate-100">
          {formatTime(seconds)}
        </div>
      </div>

      <TimerPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onConfirm={handlePopupConfirm}
      />
    </div>
  );
};

export default Timer;