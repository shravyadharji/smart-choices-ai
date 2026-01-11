import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="relative max-w-4xl mx-auto rounded-3xl hero-gradient p-8 sm:p-12 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />

          <div className="relative text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-dark mb-6">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-primary-foreground/90">
                Start Your Journey Today
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Discover Your 
              <span className="gradient-text"> Perfect Career?</span>
            </h2>

            <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8">
              Join thousands of students who have found their dream careers and colleges using our AI-powered platform. 
              It only takes 5 minutes to get started.
            </p>

            <Link to="/assessment">
              <Button variant="hero" size="xl" className="group">
                Take Free Assessment
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <p className="text-primary-foreground/50 text-sm mt-4">
              No credit card required • Free forever
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
