import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <img src="/logo.png" alt="Athena Hacks Logo" />
      
<<<<<<< HEAD
      <div>
        <Link href="app/session">
          <button>Start Session</button>
        </Link>
      </div>

      <div>
        <Link href="app/garden">
          <button>My Garden</button>
        </Link>
      </div>
=======
      <div className="centered">
        <button className="bg-red-950 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded">
          Start Session
        </button>
        <br /> <br />
        <button className="bg-red-950 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded">
          My Garden
        </button>
      </div>

>>>>>>> cca717c5a84d58f2a5d46c647336b58bbcef63ac
    </main>
  )
}






