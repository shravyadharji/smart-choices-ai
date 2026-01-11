import { Link } from "react-router-dom";
import { Sparkles, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-secondary-foreground" />
              </div>
              <span className="font-display font-bold text-xl">CareerAI</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Empowering students to make smarter career and college decisions with AI-powered guidance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Career Assessment", path: "/assessment" },
                { label: "Compare Careers", path: "/career-comparison" },
                { label: "Compare Colleges", path: "/college-comparison" },
                { label: "Skill Roadmap", path: "/roadmap" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-2">
              {["Market Trends", "Career Blog", "Success Stories", "FAQ"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-primary-foreground/70 text-sm">
                <Mail className="w-4 h-4 text-secondary" />
                support@careerai.com
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/70 text-sm">
                <Phone className="w-4 h-4 text-secondary" />
                +91 1234 567 890
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/70 text-sm">
                <MapPin className="w-4 h-4 text-secondary" />
                Mumbai, India
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center text-sm text-primary-foreground/50">
          <p>© 2026 CareerAI. All rights reserved. Built for students, by students.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
