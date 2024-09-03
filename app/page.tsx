"use client";

import { useState } from "react";
import {
  Contact as ContactComponent,
  Footer,
  Header,
  ResumeSection,
  SkillsSection,
  SocialSection,
  Banner,
  PortfolioSection,
} from "./components";

export default function Component() {
  const [showBanner, setShowBanner] = useState(true);

  const gradientStyle = {
    background: "linear-gradient(270deg, #3498db, #e91e63, #9b59b6, #3498db)",
    backgroundSize: "300% 300%",
    animation: "gradientMove 10s ease infinite",
  };

  const title = "Ravan Klar";
  const subTitle =
    "Full-stack developer, continuously creating beautiful and functional web experiences.";
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center p-2"
      style={gradientStyle}
    >
      {showBanner && <Banner setShowBanner={setShowBanner} />}
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-slate-200">
                  {title}
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl dark:text-slate-200">
                  {subTitle}
                </p>
              </div>
              <SocialSection />
            </div>
          </div>
        </section>

        <PortfolioSection />
        <SkillsSection />
        <ResumeSection />

        <ContactComponent />
      </main>

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
      `}</style>
      <Footer />
    </div>
  );
}
