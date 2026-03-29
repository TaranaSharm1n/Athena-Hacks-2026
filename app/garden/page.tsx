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
  const [hoverReturn, setHoverReturn] = useState(false)

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

      <h1
  className="text-center z-10 select-none"
  style={{
    fontFamily: "Georgia, serif",
    fontSize: "clamp(2.25rem, 2vw, 5rem)",
    fontWeight: "600",
    color: "#693509",
    letterSpacing: "-0.02em",
    textShadow: "0 4px 20px rgba(180,120,80,0.25), 0 1px 0 rgba(255,255,255,0.6)",
    animation: "float 5s ease-in-out infinite",
    marginTop: "0.5rem",
    marginBottom: "4rem",
    lineHeight: 1.1,
  }}>
  °࿔*:･My Garden°❀⋆･°
</h1>

      {/* Shelf + plants */}
<div className="relative z-10 flex flex-col" style={{ width: "80vw", maxWidth: "700px" }}>
  {rows.map((row, rowIndex) => (
    <div key={rowIndex} className="relative" style={{ height: "25vh", maxHeight: "180px" }}>
      
      {/* One shelf image per row */}
      <img
        src="/assets/Shelf-updated.png"
        alt="shelf"
        className="absolute bottom-8 left-0"
        style={{ 
          mixBlendMode: "multiply",
          width: "100%",
          height: "auto",
        }}
/     >

      {/* Plants sitting on this shelf */}
      <div className="absolute inset-0 flex flex-row justify-around items-end pb-4">
        {row.map((plant, slotIndex) => (
          <div key={slotIndex} className="flex flex-col items-center" style={{ width: "8vw", maxWidth: "100px", minWidth: "60px" }}>
            {plant ? (
              <>
                <img
                  src="/plants/plantHolder.png"
                  alt={plant.name}
                  className="object-contain block"
                  style={{ width: "10vw", maxWidth: "200px", minWidth: "150px", height: "auto", marginBottom: "-0.4rem" }}
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
              <div style={{
                width: "5vw", maxWidth: "50px", minWidth: "30px",
                height: "5vw", maxHeight: "50px", minHeight: "30px",
                borderRadius: "50%",
                border: "2px dashed rgba(100,80,60,0.2)",
                marginBottom: "20px"
              }} />
            )}
          </div>
        ))}
      </div>

    </div>
  ))}
</div>

      {/* Plant new seed button */}
      <div className="absolute bottom-8 w-full flex justify-center">
        <Link href="/session"  className="z-10 mt-4 mb-8">
          <button className="py-3 px-8 rounded-xl marginTop: 10px font-medium text-white hover:bg-pink-300 hover:scale-105 transition-all duration-300 ease-in-out"
            style={{ background: "#4a7cbf", boxShadow: "0 4px 20px rgba(74,124,191,0.35)" }}>
            ˚˖𓍢ִ໋❀ Plant a New Seed
          </button>
        </Link>

        <Link href = "/" className="z-10 mt-4 mb-8 ml-4">
          <button
            className="py-3 px-8 rounded-xl font-medium text-gray-700 hover:bg-pink-300 hover:scale-105 transition-all duration-300 ease-in-out"
            onMouseEnter={() => setHoverReturn(true)}
            onMouseLeave={() => setHoverReturn(false)}
            style={{
              background: hoverReturn ? "rgba(255,255,255,0.7)" : "rgba(255, 255, 255, 0.67)",
              border: "1px solid rgba(100,140,200,0.3)"
            }}>
            ⤷ ゛Return  ˎˊ˗
          </button>
        </Link>
      </div>
    </main>
  )
}
