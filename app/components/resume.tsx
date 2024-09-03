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
  );
}
