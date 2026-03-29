"use client";

import { useRef, useEffect } from "react";

export function useClickSound(soundPath: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Preload the sound when the component using this hook loads
    const audio = new Audio(soundPath);
    audio.preload = "auto";
    audioRef.current = audio;

    return () => {
      // Cleanup: stop sound if the user leaves the page mid-click
      audio.pause();
      audio.src = "";
    };
  }, [soundPath]);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((e) => console.log("Sound blocked:", e));
    }
  };

  return playSound;
}