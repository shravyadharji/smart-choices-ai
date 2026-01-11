import { ArrowRight, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Take the Assessment",
    description: "Answer questions about your interests, skills, academic background, and career aspirations.",
    points: ["Personality analysis", "Skill mapping", "Interest profiling"]
  },
  {
    number: "02",
    title: "Get AI Recommendations",
    description: "Our AI engine processes your profile to suggest careers and colleges that match your unique profile.",
    points: ["Career suggestions", "College matches", "Eligibility check"]
  },
  {
    number: "03",
    title: "Compare & Decide",
    description: "Use our comparison tools to evaluate different careers and colleges before making your final decision.",
    points: ["Side-by-side analysis", "Detailed insights", "Expert reviews"]
  },
  {
    number: "04",
    title: "Plan Your Journey",
    description: "Follow your personalized skill roadmap to build expertise and prepare for your chosen career path.",
    points: ["Learning path", "Milestone tracking", "Resource library"]
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to discover your ideal career path and find the perfect college to achieve your goals.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`flex flex-col md:flex-row gap-6 md:gap-12 items-start mb-12 last:mb-0 ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Number */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                  <span className="font-display text-3xl font-bold text-primary-foreground">{step.number}</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 glass-card rounded-2xl p-6">
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {step.description}
                </p>
                <ul className="space-y-2">
                  {step.points.map((point, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle className="w-4 h-4 text-secondary" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Arrow (except last) */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute -bottom-8 left-1/2 -translate-x-1/2">
                  <ArrowRight className="w-6 h-6 text-muted-foreground rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
