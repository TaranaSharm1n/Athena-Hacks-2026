"use client"
import { useEffect, useState } from "react"
import Link from "next/link"

type Plant = {
  id: number
  name: string
  stage: number
  completed: boolean
}

const MAX_SLOTS = 9

export default function Garden() {
  const [plants, setPlants] = useState<Plant[]>([])

  useEffect(() => {
    const dummyPlants = [
      { id: 1, name: "Math Homework", stage: 2, completed: false },
      { id: 2, name: "Science Project", stage: 1, completed: false },
      { id: 3, name: "History Essay", stage: 6, completed: true },
    ]
    localStorage.setItem("plants", JSON.stringify(dummyPlants))
    const saved = localStorage.getItem("plants")
    if (saved) setPlants(JSON.parse(saved))
  }, [])

  // If more than 9 plants, drop the oldest
  const visiblePlants = plants.slice(-MAX_SLOTS)

  // Always 9 slots — fill rest with null
  const slots = Array.from({ length: MAX_SLOTS }, (_, i) => visiblePlants[i] || null)

  // 3 rows of 3
  const rows = [slots.slice(0, 3), slots.slice(3, 6), slots.slice(6, 9)]

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">

      {/* Striped background */}
      <div className="absolute inset-0 -z-10" style={{
        background: "#dce8f5",
        backgroundImage: "repeating-linear-gradient(0deg, rgba(180,210,240,0.5) 0px, rgba(180,210,240,0.5) 1px, transparent 1px, transparent 40px)",
      }} />

      <h1 className="text-3xl font-bold text-center mt-8 mb-4 z-10"
        style={{ color: "#321d0c", fontFamily: "serif" }}>
        My Garden
      </h1>

      {/* Shelf + plants */}
      <div className="relative z-10" style={{ width: "80vw", maxWidth: "700px", height: "70vh", maxHeight: "600px" }}>
        {/* Shelf image — mixBlendMode removes black background */}
        <img
          src="?assets/Shelf.png"
          alt="shelf"
          className="absolute inset-0 w-full h-full object-contain"
          style={{ mixBlendMode: "multiply" }}
        />

        {/* Plant slots */}
        <div className="absolute inset-0 flex flex-col justify-around px-16 py-6">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-row justify-around items-end">
              {row.map((plant, slotIndex) => (
                <div key={slotIndex} className="flex flex-col items-center" style={{ width: "120px" }}>
                  {plant ? (
                    <>
                      <img
                        src="/plants/plantHolder.png"
                        alt={plant.name}
                        className="object-contain block"
                        style={{ width: "8vw", maxWidth: "80px", minWidth: "50px", height: "auto", marginBottom: "-4px" }}
                      />
                      <div className="rounded-full overflow-hidden bg-gray-300" style={{ width: "8vw", maxWidth: "80px", minWidth: "50px", height: "6px" }}>
                        <div className="h-full bg-green-500 rounded-full transition-all duration-300"
                          style={{ width: `${(plant.stage / 6) * 100}%` }} />
                      </div>
                      <p className="text-xs font-medium text-center mt-1"
                        style={{ color: "#321d0c", maxWidth: "80px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {plant.name}
                      </p>
                    </>
                  ) : (
                    // Empty slot indicator
                    <div style={{
                      width: "5vw", maxWidth: "50px", minWidth: "30px",
                      height: "5vw", maxHeight: "50px", minHeight: "30px",
                      borderRadius: "50%",
                      border: "2px dashed rgba(100,80,60,0.2)",
                      marginBottom: "24px"
                    }} />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Plant new seed button */}
      <div className="absolute bottom-10 w-full flex justify-center">
        <Link href="/session"  className="z-10 mt-4 mb-8">
          <button className="py-3 px-8 rounded-xl font-medium text-white"
            style={{ background: "#4a7cbf", boxShadow: "0 4px 20px rgba(74,124,191,0.35)" }}>
            🌱 Plant a New Seed
          </button>
        </Link>
      </div>
    </main>
  )
}
