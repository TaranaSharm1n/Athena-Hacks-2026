import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="bg-[url('/img/mountains.jpg')] h-48 w-full bg-cover bg-center">
        <div className="flex flex-col items-center justify-center h-screen gap-0.125">
        <img className = "h-16 w-16" src="/assets/flowerPlaceholder.png" alt="Athena Hacks Logo" />
        <h1 className="text-4xl font-bold text-center">Welcome to Athena Hacks!</h1>
        <p className="text-lg text-center">Grow Your Producitivity!</p>
        <br /> <br />

        <Link href="/session">
          <button className="bg-red-950 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded">
            Start Session
          </button>
        </Link>
        <br /> <br />
        <Link href="/garden">
          <button className="bg-red-950 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded">
            My Garden
          </button>
        </Link>
      </div>
      </div>
    </main>
  )
}






