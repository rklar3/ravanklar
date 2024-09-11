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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Bar */}
      <nav className="bg-transparent text-white absolute top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <a href="#" className="text-2xl font-bold">
              AutomateNow
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
            Unlock unprecedented efficiency, save valuable time, and skyrocket
            your productivity with our cutting-edge, AI-powered automation
            solutions tailored for small businesses. Experience the future of
            work today.
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
          <p className="text-lg text-center max-w-3xl mx-auto"></p>
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
                title: "Process Automation",
                description:
                  "Streamline your workflows and reduce manual tasks",
                details:
                  "Our process automation service helps you identify repetitive tasks and create efficient workflows. We use cutting-edge tools to automate data entry, document processing, and more.",
              },
              {
                icon: <BarChart2 className="h-10 w-10 mb-4" />,
                title: "Data Integration",
                description: "Connect your systems for seamless data flow",
                details:
                  "We specialize in connecting disparate systems and databases, ensuring smooth data transfer and synchronization. This eliminates data silos and improves overall efficiency.",
              },
              {
                icon: <Zap className="h-10 w-10 mb-4" />,
                title: "Custom Software Solutions",
                description:
                  "Tailor-made applications to fit your unique needs",
                details:
                  "Our team develops bespoke software solutions designed to address your specific business challenges. From mobile apps to web platforms, we create intuitive and scalable solutions.",
              },
              {
                icon: <Clock className="h-10 w-10 mb-4" />,
                title: "Automation Consulting",
                description:
                  "Expert advice on optimizing your business processes",
                details:
                  "Our consultants work closely with your team to analyze current processes, identify automation opportunities, and create a roadmap for implementation. We provide ongoing support to ensure success.",
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
                author: "Jane Doe, CEO of SmallBiz Inc.",
              },
              {
                quote:
                  "The team at AutomateNow truly understands the unique challenges of small businesses. Their custom software solution has streamlined our operations beyond our expectations.",
                author: "John Smith, Founder of TechStart",
              },
              {
                quote:
                  "The ROI on our automation project was incredible. We've reduced errors by 90% and can now focus on growing our business instead of managing tedious tasks.",
                author: "Sarah Johnson, Operations Manager at GrowFast",
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

      {/* Pricing Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Simple, Transparent Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Basic",
                price: "$499",
                features: [
                  "5 automated workflows",
                  "Email support",
                  "Monthly review",
                ],
              },
              {
                title: "Pro",
                price: "$999",
                features: [
                  "10 automated workflows",
                  "Priority email & phone support",
                  "Weekly review",
                  "Custom integrations",
                ],
              },
              {
                title: "Enterprise",
                price: "Custom",
                features: [
                  "Unlimited workflows",
                  "24/7 support",
                  "Dedicated account manager",
                  "On-site training",
                ],
              },
            ].map((plan, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    {plan.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold mb-4">{plan.price}</p>
                  <ul className="list-disc list-inside mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    onClick={() => scrollToSection("contact")}
                  >
                    Choose Plan
                  </Button>
                </CardContent>
              </Card>
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
                What types of businesses can benefit from automation?
              </AccordionTrigger>
              <AccordionContent className="px-4 py-2 text-gray-700">
                Businesses of all sizes and industries can benefit from
                automation. Our solutions are particularly valuable for small to
                medium-sized businesses looking to streamline operations, reduce
                costs, and improve efficiency.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-b">
              <AccordionTrigger className="px-4 py-4 hover:bg-gray-50">
                {"How long does it take to implement an automation solution?"}
              </AccordionTrigger>
              <AccordionContent className="px-4 py-2 text-gray-700">
                {
                  "The implementation time varies depending on the complexity of the project. Simple automations can be set up in a few weeks, while more complex systems may take several months. We'll provide a detailed timeline during our initial consultation."
                }
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="px-4 py-4 hover:bg-gray-50">
                {"Do you offer ongoing support after implementation?"}
              </AccordionTrigger>
              <AccordionContent className="px-4 py-2 text-gray-700">
                {
                  "Yes, we provide ongoing support and maintenance for all our automation solutions. Our team is always available to help with updates, troubleshooting, and optimizations to ensure your systems continue to run smoothly."
                }
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
          <p>&copy; 2024 AutomateNow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
