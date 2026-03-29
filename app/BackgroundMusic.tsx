"use client"; // Required for audio to work in Next.js

import { useEffect } from "react";

export default function BackgroundMusic() {
  useEffect(() => {
    // 1. Point to your music file (put the file in your 'public' folder)
    const audio = new Audio("/bensound-moonlightdrive.mp3"); 
    audio.loop = true;
    audio.volume = 0.4; // 30% volume

    const playMusic = () => {
      audio.play().catch(() => {
        // This catch prevents errors if the browser blocks autoplay
        console.log("Waiting for user to click to start music...");
      });
      // Remove listener after first interaction so it doesn't restart
      window.removeEventListener("click", playMusic);
    };

    // 2. Listen for the first click anywhere on the page
    window.addEventListener("click", playMusic);

    // 3. IMPORTANT: This stops the music the second the user leaves the homepage
    return () => {
      audio.pause();
      audio.src = ""; // Completely kills the audio process
      window.removeEventListener("click", playMusic);
    };
  }, []);

  return null; // This component doesn't need to show anything visually
}