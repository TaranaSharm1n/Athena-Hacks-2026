"use client"
import { useEffect, useState } from "react"
import Link from "next/link"


type Plant = {
  id: number;
  name: string;
  stage: number;
  completed: boolean;
};


export default function Garden() {
  const [plants, setPlants] = useState<Plant[]>([])

  useEffect(() => {
    // Fetch plants from localStorage on component mount
    const dummyPlants = [
      { id: 1, name: "Math Homework", stage: 2, completed: false },
      { id: 2, name: "Science Project", stage: 1, completed: false },
      { id: 3, name: "History Essay", stage: 6, completed: true },
    ]
    localStorage.setItem("plants", JSON.stringify(dummyPlants))
    
    const saved = localStorage.getItem("plants")
    if (saved) setPlants(JSON.parse(saved))
  }, [])

  return (
    <main
      className="min-h-screen w-full relative flex flex-col"
      style={{
        backgroundImage: "url('/assets/download.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-3xl font-bold text-center mt-12 mb-8"
        style={{ color: "#321d0c", fontFamily: "serif", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
        My Garden
      </h1>

      {/* Plants on the shelf */}
      <div className="flex flex-row items-end justify-center gap-8 w-full px-8 flex-wrap">
        {plants.map((plants) => (
          <div key={plants.id} className="flex flex-col items-center gap-2">
            <img
              src={"/plants/plantHolder.png"}
              alt={plants.name}
              className="w-24 object-contain block"
              style={{ height: "200px", marginBottom: "-50px" }}
            />
          <div className="w-24 h-2 bg-gray-300 rounded-full overflow-hidden -mt-1">
            <div className="h-full bg-green-500 rounded-full transition-all duration-300"
              style={{ width: `${(plants.stage / 6) * 100}%` }} />
          </div>
          <p className="text-sm font-medium drop-shadow text-white mt-1">
            {plants.name}
          </p>
        </div>
        ))}
      </div>

      {/* Plant new seed button */}
      <div className="absolute bottom-10 w-full flex justify-center">
        <Link href="/session">
          <button className="py-3 px-8 rounded-xl font-medium text-white"
            style={{ background: "#4a7cbf", boxShadow: "0 4px 20px rgba(74,124,191,0.35)" }}>
            🌱 Plant a New Seed
          </button>
        </Link>
      </div>
    </main>
  )
}
