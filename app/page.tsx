import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <img src="/logo.png" alt="Athena Hacks Logo" />
      
      <div className="centered">
        <button className="bg-red-950 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded">
          Start Session
        </button>
        <br /> <br />
        <button className="bg-red-950 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded">
          My Garden
        </button>
      </div>

    </main>
  )
}






