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
import { motion } from "framer-motion";

export default function Component() {
  const [showBanner, setShowBanner] = useState(false);

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
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-200"
                >
                  {title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xl md:text-2xl lg:text-xl mb-10 max-w-4xl mx-auto text-gray-300"
                >
                  {subTitle}
                </motion.p>
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
