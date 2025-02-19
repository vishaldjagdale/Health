import { Facebook, Instagram, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1C2529] border-t border-white/10 text-white py-2">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">

          {/* Branding Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">HealthNodes</h2>
            <p className="text-white/60">
              AI-powered healthcare solutions
            </p>
            <div className="flex gap-3 text-white/60">
              
              <SocialIcon href="https://instagram.com/_jagdalevishal" icon={<Instagram className="w-4 h-4" />} />
              
              <SocialIcon href="https://linkedin.com/in/vishal-jagdale" icon={<Linkedin className="w-4 h-4" />} />
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <h3 className="font-medium text-white/90">Quick Links</h3>
            <FooterLink href="/Locations">Medical Centers</FooterLink>
            <FooterLink href="/Specialists">Specialists</FooterLink>
            <FooterLink href="https://youtu.be/5YNKDTfDuD0">Mental Health</FooterLink>
            <FooterLink href="https://instagram.com/_jagdalevishal">Contact</FooterLink>
          </nav>

          {/* Contact */}
          <div className="space-y-2">
            <h3 className="font-medium text-white/90">Contact</h3>
            <FooterLink href="mailto:support@healthnodes.com">
              <Mail className="w-4 h-4 mr-1 inline" />
              vishaljagdale6168@gmail.com
            </FooterLink>
          </div>

        </div>

        {/* Copyright */}
        {/* <div className="border-t border-white/10 mt-8 pt-6 text-center text-white/50 text-sm">
          <p>&copy; {new Date().getFullYear()} HealthNodes. All rights reserved.</p>
        </div> */}
      </div>
    </footer>
  );
};

const SocialIcon = ({ href, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-white transition-colors"
  >
    {icon}
  </a>
);

const FooterLink = ({ href, children }) => (
  <a
    href={href}
    className="block text-white/60 hover:text-white transition-colors py-1"
  >
    {children}
  </a>
);

export default Footer;