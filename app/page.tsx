import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <img src="/logo.png" alt="Athena Hacks Logo" />
      
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
    </main>
  )
}






