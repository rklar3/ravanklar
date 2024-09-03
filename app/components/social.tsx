import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, LucideIcon } from "lucide-react";
import Link from "next/link";

interface SocialLink {
  href: string;
  icon: LucideIcon;
  label: string;
}
const socialLinks: SocialLink[] = [
  {
    href: "https://github.com/rklar3",
    icon: Github,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/ravanklar/",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    href: "mailto:ravanklar3@gmail.com",
    icon: Mail,
    label: "Email",
  },
];

const SocialSection = () => {
  return (
    <div className="space-x-4">
      {socialLinks.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="ghost"
            size="icon"
            className="bg-gray-800 text-gray-200"
          >
            <link.icon className="h-4 w-4" />
            <span className="sr-only">{link.label}</span>
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default SocialSection;
