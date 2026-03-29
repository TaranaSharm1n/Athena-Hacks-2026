import Image from "next/image";
import link from "next/link";

export default function Home() {
  return (
    <main>
      <img src="/logo.png" alt="Athena Hacks Logo" />
      
      <div>
        <link href="app/session">
          <button>Start Session</button>
        </link>
      </div>

      <div>
        <link href="app/garden">
          <button>My Garden</button>
        </link>
      </div>
    </main>
  )
}






