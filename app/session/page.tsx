"use client";
import { useState } from "react";
import Timer from "../components/timer";
import WebcamFeed from "../components/webcam";
import WorkTimerPopup from "../components/timer_popup";



export default function Session() {

  return (
    <main className="h-screen w-screen flex justify-center"
    style={{
        background: "#dce8f5",
        backgroundImage: "repeating-linear-gradient(0deg, rgba(180,210,240,0.5) 0px, rgba(180,210,240,0.5) 1px, transparent 1px, transparent 40px)",
      }}
    >
      <img src="/assets/Table.png" alt="table" className="bottom-0" />
      
      
      <div className="absolute top-30 right-16 rounded-full">
        <WebcamFeed />
      </div>

      <div className="absolute top-80 right-80 text-center">
        <Timer />
      </div>
      <WorkTimerPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onConfirm={handleConfirm}
      />
    </main>
  );
}
