import Image from "next/image";
import Link from "next/link";
import BackgroundMusic from "./BackgroundMusic";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #ccdbea 0%, #c8ddf0 40%, #bdd4ec 100%)" }}>
      
      <BackgroundMusic />

      {/* Soft background blobs */}
      <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "#84f8bc", opacity: 0.35, top: -80, right: -60, filter: "blur(40px)" }} />
      <div style={{ position: "absolute", width: 250, height: 250, borderRadius: "50%", background: "#77d3a1", opacity: 0.4, bottom: -60, left: -40, filter: "blur(40px)" }} />

      <div className="flex flex-col items-center gap-4 z-10">
        <img 
        src="\assets\Logo (2).png"
        alt="Athena Hacks Logo"
        className="h-75 w-auto mb-4"
        style={{ animation: "float 5s ease-in-out infinite", filter: "drop-shadow(0 4px 20px rgba(180,120,200,0.35))" }}
      />
      <h1 className="text-4xl font-bold text-center" style={{ color: "#2a3f5c", fontFamily: "serif" }}>
        Grow Your Productivity
      </h1>
      <p className="text-sm tracking-widest uppercase" style={{ color: "#7a9abf" }}>
        An application made by Tarana, Micah, Emily, Evy
      </p>

       <div className="flex flex-col gap-3 w-64 mt-4">
          <Link href="/session">
            <button className="w-full py-3 px-6 rounded-xl font-medium transition-all duration-200 hover:-translate-y-0.5 text-white"
              style={{ background: "#4a7cbf", boxShadow: "0 4px 20px rgba(74,124,191,0.35)" }}>
              ⋆‧°𓏲ּ𝄢 Start Session
            </button>
          </Link>
          <Link href="/garden">
            <button className="w-full py-3 px-6 rounded-xl font-medium transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "rgba(255,255,255,0.5)", color: "#4a6a9a", border: "1px solid rgba(100,140,200,0.3)" }}>
              ⋆‧°𓏲ּ𝄢 My Garden
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}






