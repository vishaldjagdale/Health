import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white/10 border-t border-white/20 text-white py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          
          {/* Left Section - Branding */}
          <div className="space-y-2">
            {/* <h2 className="text-3xl font-bold text-white">HealthFinder</h2>
            <p className="text-white/70">Your trusted healthcare companion</p> */}
          </div>

          {/* Middle Section - Navigation */}
          <nav className="flex gap-6 text-white/80">
            <FooterLink href="#">Hospitals</FooterLink>
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
          </nav>

          {/* Right Section - Social Media Links */}
          <div className="flex gap-5">
            <SocialIcon href="#" icon={<Facebook className="w-6 h-6" />} />
            <SocialIcon href="https://www.instagram.com/_jagdalevishal?igsh=MWxzdnlmaWc5Zmd4Yg==" icon={<Instagram className="w-6 h-6" />} />
            <SocialIcon href="#" icon={<Twitter className="w-6 h-6" />} />
            <SocialIcon href="" icon={<Linkedin className="w-6 h-6" />} />
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-white/20 mt-8 pt-4 text-center text-white/60 text-sm">
          &copy; {new Date().getFullYear()} 
        </div>
      </div>
    </footer>
  );
};

// Reusable Footer Link Component
const FooterLink = ({ href, children }) => (
  <a
    href={href}
    className="transition-all duration-300 hover:text-white hover:underline"
  >
    {children}
  </a>
);

// Social Media Icon Component
const SocialIcon = ({ href, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 rounded-full transition-all duration-300 hover:bg-white/20"
  >
    {icon}
  </a>
);

export default Footer;
