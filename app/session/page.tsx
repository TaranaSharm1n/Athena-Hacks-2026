"use client";
import { useState } from "react";
import Timer from "../components/timer";
import WebcamFeed from "../components/webcam";
import Link from "next/link";


export default function Session() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <main className="h-screen w-screen flex justify-center"
    style={{
        background: "#dce8f5",
        backgroundImage: "repeating-linear-gradient(0deg, rgba(180,210,240,0.5) 0px, rgba(180,210,240,0.5) 1px, transparent 1px, transparent 40px)",
      }}
    >
     <Link href = "/">
      <button className = "absolute top-10 left-10 rounded-xl bg-slate-500 text-white px-4 py-2 hover:bg-slate-600"
        >
        Back to Home
      </button>
      </Link>

      <img src="/assets/table.png" alt="table" className="bottom-0" />
      
      
      <div className="absolute top-30 right-16 rounded-full">
        <WebcamFeed />
      </div>

      <div className="absolute top-80 right-80 text-center">
        <Timer durationMinutes={30}/>
      </div>
      
    </main>
  );
}
