import Timer from "../components/timer";
import WebcamFeed from "../components/webcam";

export default function Session() {
  return (
    <main className="relative h-screen w-screen flex justify-center items-center bg-gray-100">
      
      <div className="absolute top-30 right-16 rounded-full">
        <WebcamFeed />
      </div>

      
      <div className="absolute top-80 right-80 text-center">
        <Timer />
      </div>
    </main>
  );
}
