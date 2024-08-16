import Image from "next/image";
import ImageDetection from "./detection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-800">
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
        Rndm APP
      </h1>
    </div>

    <div className="relative flex items-center justify-center">
      <ImageDetection />
    </div>
  </main>
  );
}