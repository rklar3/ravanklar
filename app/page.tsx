"use client";
import { Button } from "@/components/ui/button";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import Header from "./components/header";
import Footer from "./components/footer";
import PortfolioSection from "./components/projects";
import SkillsSection from "./components/skills";

export default function Component() {
  const gradientStyle = {
    background: "linear-gradient(270deg, #3498db, #e91e63, #9b59b6, #3498db)",
    backgroundSize: "300% 300%",
    animation: "gradientMove 10s ease infinite",
  };

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center p-2"
      style={gradientStyle}
    >
      <Header />

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-slate-200">
                  Ravan Klar
                </h1>
                <p className="mx-auto max-w-[700px] text-slate-300 md:text-xl dark:text-slate-200">
                  Web Developer & Designer. Passionate about creating beautiful
                  and functional web experiences.
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  href="https://github.com/rklar3"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="icon">
                    <Github className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/ravanklar/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="icon">
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </Link>
                <Link href="mailto:ravanklar3@gmail.com">
                  <Button variant="outline" size="icon">
                    <Mail className="h-4 w-4" />
                    <span className="sr-only">Email</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <PortfolioSection />
        <SkillsSection />

        <section id="resume" className="w-full py-12 md:py-24 lg:py-32 ">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-200">
                  Resume
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-800 md:text-xl text-slate-200">
                  View my resume to learn more about my experience and
                  qualifications.
                </p>
              </div>
              <Button className="inline-flex items-center justify-center">
                <Download className="mr-2 h-4 w-4" />
                <Link
                  href="https://firebasestorage.googleapis.com/v0/b/mood-tracker-73e68.appspot.com/o/ravank_08_24.pdf?alt=media&token=d40901e2-d8e6-4c3a-950c-01ae92c3aced"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  View Resume
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 ">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-200">
                  {"Let's get in touch"}
                </h2>

                <p className="mx-auto max-w-[700px] text-gray-800 md:text-xl text-slate-200">
                  ravanklar3@gmail.com
                </p>
              </div>
            </div>
          </div>
        </section>
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
