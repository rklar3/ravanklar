import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PortfolioSection() {
  const title = "Portfolio / Projects";

  const projects = [
    {
      title: "Mood Tracker",
      description: "Application to track your mood based on colors and moods",
      link: "https://mood-tracker-beta.vercel.app/",
      // imageSrc: "/path/to/image.jpg", // Optional
    },
    {
      title: "DuMoulin Boskovich",
      description:
        "Created and designed a website for DuMoulin Boskovich, a law firm located in Vancouver BC",
      link: "https://dubo.com",
      // imageSrc: "/path/to/image.jpg", // Optional
    },
    {
      title: "Photonix",
      description: "Created a stock photo website for a client",
      link: "https://photonix.ca",
      // imageSrc: "/path/to/image.jpg", // Optional
    },
    {
      title: "ICBCHx",
      description: "A website to publish ICBC related articles for a client",
      link: "https://icbchx.ca",
      // imageSrc: "/path/to/image.jpg", // Optional
    },
    {
      title: "Paradise Furniture",
      description: "A ecommerce website for Paradise Furniture",
      link: "https://www.paradisefurniture.ca/",
      // imageSrc: "/path/to/image.jpg", // Optional
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="portfolio" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          // className="text-3xl md:text-5xl lg:text-5xl font-bold mb-6 text-slate-200 text-center mb-8 font-bold tracking-tighter"
        >
          {title}
        </motion.h2>
        <motion.div
          // className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="mt-4 bg-gray-800 text-gray-300"
                    variant="outline"
                  >
                    <Link
                      href={project.link}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      View Project
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
