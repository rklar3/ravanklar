import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function ResumeSection() {
  return (
    <section id="resume" className="w-full py-12 md:py-24 lg:py-32 ">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-200">
              Resume
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
              View my resume to learn more about my experience and
              qualifications.
            </p>
          </div>
          <Button
            className="inline-flex items-center justify-center mt-4 bg-gray-800 p-4 text-gray-300"
            variant="ghost"
          >
            <Download className="mr-2 h-4 w-4" />
            <Link
              href="https://firebasestorage.googleapis.com/v0/b/mood-tracker-73e68.appspot.com/o/ravank_resume.pdf?alt=media&token=8f7d35f2-4963-42a8-ba31-be87619c0448"
              rel="noopener noreferrer"
              target="_blank"
            >
              View Resume
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
