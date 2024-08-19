"use client";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-2" style={gradientStyle}>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
          ravanklar.com
        </h1>
        <p className="max-w-[600px] text-white/80 md:text-xl">
          a place to post projects and ideas
        </p>
      </div>
      <style jsx>{`
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        main {
          background: linear-gradient(270deg, #3498db, #e91e63, #9b59b6, #3498db);
          background-size: 300% 300%;
          animation: gradientMove 10s ease infinite;
        }
      `}</style>
    </main>
  );
}

const gradientStyle = {
  background: 'linear-gradient(270deg, #3498db, #e91e63, #9b59b6, #3498db)',
  backgroundSize: '300% 300%',
  animation: 'gradientMove 10s ease infinite',
};
