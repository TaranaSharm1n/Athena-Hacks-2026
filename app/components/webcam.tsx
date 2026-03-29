"use client";

import React, { useEffect, useRef, useState } from "react";

const WebcamFeed: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Request webcam access
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        setError("Unable to access webcam. Please allow camera access.");
        console.error(err);
      }
    };

    startWebcam();

    // Cleanup: stop the webcam when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      {error && <p className="text-red-500">{error}</p>}
      <video
        ref={videoRef}
        className="w-45 h-45 border-10 border-black overflow-hidden bg-black rounded-full shadow-lg"
        autoPlay
        playsInline
        muted
      />
    </div>
  );
};

export default WebcamFeed;