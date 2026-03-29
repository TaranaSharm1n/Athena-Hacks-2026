"use client";
import { useState, useEffect } from "react";
import Timer from "../components/timer";
import WebcamFeed from "../components/webcam";
import Link from "next/link";
import { getPlantImage } from "../components/plants";

type Plant = {
  id: number
  name: string
  stage: number
  completed: boolean
  plantTypeId: string
}

export default function Session() {
  const [currentPlant, setCurrentPlant] = useState<Plant | null>(null)
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [sessionActive, setSessionActive] = useState(false)
  const [taskName, setTaskName] = useState("")

  function calculateStage(elapsed: number, total: number): number {
    if (total === 0) return 1
    const progress = elapsed / total
    const stage = Math.floor(progress * 6) + 1
    return Math.min(stage, 6)
  }

  function handleSessionStart(taskName: string, plantTypeId: string, minutes: number) {
    const total = minutes * 60
    setTotalSeconds(total)
    setElapsedSeconds(0)
    setSessionActive(true)

    const newPlant: Plant = {
      id: Date.now(),
      name: taskName,
      stage: 1,
      completed: false,
      plantTypeId: plantTypeId,
    }

    const saved = localStorage.getItem("plants")
    const existing: Plant[] = saved ? JSON.parse(saved) : []
    localStorage.setItem("plants", JSON.stringify([...existing, newPlant]))
    setCurrentPlant(newPlant)
  }

  useEffect(() => {
    if (!sessionActive || !currentPlant || totalSeconds === 0) return

    const interval = setInterval(() => {
      setElapsedSeconds(prev => {
        const newElapsed = prev + 1
        const newStage = calculateStage(newElapsed, totalSeconds)

        if (newStage !== currentPlant.stage) {
          const updatedPlant = { ...currentPlant, stage: newStage, completed: newStage === 6 }
          setCurrentPlant(updatedPlant)

          const saved = localStorage.getItem("plants")
          const existing: Plant[] = saved ? JSON.parse(saved) : []
          const updated = existing.map(p => p.id === updatedPlant.id ? updatedPlant : p)
          localStorage.setItem("plants", JSON.stringify(updated))
        }

        return newElapsed
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [sessionActive, currentPlant, totalSeconds])

  return (
    <main className="h-screen w-screen flex justify-center relative"
      style={{
        background: "#dce8f5",
        backgroundImage: "repeating-linear-gradient(0deg, rgba(180,210,240,0.5) 0px, rgba(180,210,240,0.5) 1px, transparent 1px, transparent 40px)",
      }}
    >
      {/* Dev 1's back button */}
      <Link href="/">
        <button className="absolute top-10 left-10 rounded-xl bg-slate-500 text-white px-4 py-2 hover:bg-slate-600">
          Back to Home
        </button>
      </Link>

      <img src="assets/table.png" alt="table" className="absolute bottom-0" />

      {/* Plant on the desk*/}
      {currentPlant && (
        <div className="absolute top-150 left-40 items-center flex flex-col">
          <img
            src={getPlantImage(currentPlant.plantTypeId, currentPlant.stage)}
            alt={currentPlant.name}
            style={{ width: "120px", height: "auto" }}
          />
          <p className="text-sm mt-1" style={{ color: "#321d0c" }}>
            {currentPlant.name}
          </p>
        </div>
      )}

      <div className="absolute top-8 right-16 rounded-full">
        <WebcamFeed />
      </div>

      <div className="absolute top-150 right-80 text-center">
        <Timer
          durationMinutes={totalSeconds / 60 || 30}
          onSessionStart={handleSessionStart}
        />
      </div>
    </main>
  );
}