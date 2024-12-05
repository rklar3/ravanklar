"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, useInView } from "framer-motion";
import {
  CheckCircle2,
  BarChart2,
  Zap,
  Clock,
  ArrowRight,
  Menu,
  ChevronDown,
} from "lucide-react";
import { PortfolioSection } from "./components";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const servicesRef = useRef(null);
  const isInView = useInView(servicesRef, { once: true });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", { email, message });
    // Reset form fields
    setEmail("");
    setMessage("");
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Bar */}
      <nav className="bg-transparent text-white absolute top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <a href="#" className="text-2xl font-bold">
              RK Consulting
            </a>
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:bg-white/20"
              >
                <Menu />
              </Button>
            </div>
            <ul
              className={`md:flex space-x-6 ${isMenuOpen ? "block" : "hidden"}`}
            >
              <li>
                <a
                  href="#about"
                  onClick={() => scrollToSection("about")}
                  className="hover:underline"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={() => scrollToSection("services")}
                  className="hover:underline"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={() => scrollToSection("contact")}
                  className="hover:underline"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-blue-600 text-white relative overflow-hidden h-screen flex items-center">
        <div className="container mx-auto px-4 py-24 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Learn to leverage modern technology
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl lg:text-3xl mb-10 max-w-4xl mx-auto"
          >
            Transform your business with custom software solutions and stunning
            websites. From concept to deployment, we build digital experiences
            that drive results.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="space-y-4 md:space-y-0 md:space-x-4"
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="group text-lg px-8 py-4"
            >
              Learn More
              <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
        <motion.div
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -50, 50, 0],
            rotate: [0, 45, -45, 0],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
          className="absolute top-1/4 left-1/4 w-16 h-16 bg-blue-300 rounded-full opacity-30"
        />
        <motion.div
          animate={{
            x: [0, -150, 150, 0],
            y: [0, 75, -75, 0],
            rotate: [0, -60, 60, 0],
          }}
          transition={{
            duration: 25,
            ease: "linear",
            repeat: Infinity,
          }}
          className="absolute bottom-1/3 right-1/3 w-20 h-20 bg-blue-400 rounded-full opacity-20"
        />
        <motion.div
          animate={{
            x: [0, 200, -200, 0],
            y: [0, -100, 100, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
          className="absolute top-1/2 left-1/2 w-24 h-24 bg-blue-200 rounded-full opacity-25"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 18,
            ease: "linear",
            repeat: Infinity,
          }}
          className="absolute -bottom-16 -right-16 w-64 h-64 bg-blue-400 rounded-full opacity-20"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -15, 15, 0],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
          className="absolute -top-20 -left-20 w-80 h-80 bg-blue-300 rounded-full opacity-10"
        />
      </header>

      {/* About Section */}
      <section id="about" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
          <p className="text-lg text-center max-w-3xl mx-auto">
            At RK Consulting, we are a team of skilled software developers and
            designers dedicated to crafting exceptional websites and custom
            software solutions. With extensive experience across a wide range of
            projects, we bring creativity and technical expertise to every
            endeavor. Our commitment to quality and innovation ensures that we
            deliver digital experiences that not only meet but exceed our
            clients&apos; expectations.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-muted" ref={servicesRef}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <CheckCircle2 className="h-10 w-10 mb-4" />,
                title: "Custom Web Development",
                description:
                  "Tailored websites that convert visitors into customers",
                details:
                  "We create responsive, fast-loading websites optimized for search engines and user experience. Every site is built with your business goals in mind.",
              },
              {
                icon: <BarChart2 className="h-10 w-10 mb-4" />,
                title: "Software Development",
                description: "Bespoke software solutions for your unique needs",
                details:
                  "From internal tools to customer-facing applications, we develop scalable software that streamlines your operations and enhances productivity.",
              },
              {
                icon: <Zap className="h-10 w-10 mb-4" />,
                title: "E-commerce Solutions",
                description: "Online stores that drive sales",
                details:
                  "We build secure, user-friendly e-commerce platforms that provide seamless shopping experiences and effective inventory management.",
              },
              {
                icon: <Clock className="h-10 w-10 mb-4" />,
                title: "Technical Consulting",
                description: "Expert guidance for your digital projects",
                details:
                  "Our experienced team provides strategic advice on technology choices, architecture decisions, and implementation approaches.",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center h-full flex flex-col">
                  <CardContent className="pt-6 flex-grow">
                    {service.icon}
                    <h3 className="text-xl font-semibold mb-2">
                      {service.title}
                    </h3>
                    <p className="mb-4">{service.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {service.details}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Clients Say
          </h2>
          <div className="max-w-2xl mx-auto">
            {[
              {
                quote:
                  "Their automation solutions have transformed our business. We've seen a 40% increase in productivity since implementing their systems.",
                author: "Tanvir, Paradise Patio.",
              },
              {
                quote:
                  "The team at RK Consulting truly understands the unique challenges of small businesses. Their custom software solution has streamlined our operations beyond our expectations.",
                author: "Gurk, Apex Rv",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentTestimonial ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className={index === currentTestimonial ? "block" : "hidden"}
              >
                <blockquote className="text-center">
                  <p className="text-xl italic mb-4">{testimonial.quote}</p>
                  <cite className="text-lg font-semibold">
                    - {testimonial.author}
                  </cite>
                </blockquote>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full mx-1 ${
                  index === currentTestimonial ? "bg-primary" : "bg-gray-300"
                }`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    View Project →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Frequently Asked Questions
          </h2>
          <Accordion
            type="single"
            collapsible
            className="max-w-2xl mx-auto bg-white rounded-lg"
          >
            <AccordionItem value="item-1" className="border-b">
              <AccordionTrigger className="px-4 py-4 hover:bg-gray-50">
                What types of projects do you typically work on?
              </AccordionTrigger>
              <AccordionContent className="px-4 py-2 text-gray-700">
                We specialize in custom web applications, business websites,
                e-commerce platforms, and internal software tools. Our projects
                range from simple landing pages to complex enterprise
                applications, always tailored to meet specific business needs.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-b">
              <AccordionTrigger className="px-4 py-4 hover:bg-gray-50">
                How long does it take to complete a typical project?
              </AccordionTrigger>
              <AccordionContent className="px-4 py-2 text-gray-700">
                Project timelines vary based on complexity and requirements. A
                basic website might take 4-6 weeks, while more complex software
                applications can take 3-6 months or more. We&apos;ll provide a
                detailed timeline during our initial consultation.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="px-4 py-4 hover:bg-gray-50">
                Do you provide ongoing maintenance and support?
              </AccordionTrigger>
              <AccordionContent className="px-4 py-2 text-gray-700">
                Yes, we offer comprehensive maintenance and support packages for
                all our projects. This includes regular updates, security
                patches, performance monitoring, and technical support to ensure
                your digital solutions continue to perform optimally.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="px-4 py-4 hover:bg-gray-50">
                What technologies do you work with?
              </AccordionTrigger>
              <AccordionContent className="px-4 py-2 text-gray-700">
                We&apos;re proficient in modern web technologies including
                React, Next.js, Node.js, and various other frameworks and tools.
                We choose the best technology stack for each project based on
                your specific requirements and goals.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-white">
          <h2 className="text-4xl font-bold text-center mb-8">
            {"Let's get in touch"}
          </h2>
          <p className="text-lg text-center max-w-3xl mx-auto">
            ravanklar3@gmail.com
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 RK Consulting. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
