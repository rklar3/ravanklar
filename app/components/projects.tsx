import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function PortfolioSection() {
  const title = "Portfolio / Projects";

  const projects = [
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

  return (
    <section id="portfolio" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center text-slate-200">
          {title}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {/* <Image
                  src={project.imageSrc}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-md"
                  width={200}
                  height={100}
                /> */}
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
          ))}
        </div>
      </div>
    </section>
  );
}
