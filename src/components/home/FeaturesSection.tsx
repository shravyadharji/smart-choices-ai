import { Link } from "react-router-dom";
import { 
  ClipboardCheck, 
  GitCompare, 
  Map, 
  BarChart3, 
  Building2, 
  Award,
  ArrowRight
} from "lucide-react";

const features = [
  {
    icon: ClipboardCheck,
    title: "Smart Career Assessment",
    description: "Answer questions about your interests, skills, and goals. Our AI analyzes your responses to suggest personalized career paths.",
    link: "/assessment",
    color: "bg-secondary/10 text-secondary"
  },
  {
    icon: GitCompare,
    title: "Career Comparison",
    description: "Compare multiple careers side-by-side. View salary ranges, growth prospects, work-life balance, and required qualifications.",
    link: "/career-comparison",
    color: "bg-accent/10 text-accent"
  },
  {
    icon: Building2,
    title: "College Comparison",
    description: "Evaluate colleges based on placements, facilities, campus life, fees, and student reviews to make informed decisions.",
    link: "/college-comparison",
    color: "bg-primary/10 text-primary"
  },
  {
    icon: Map,
    title: "Skill Roadmap",
    description: "Get a year-by-year learning plan tailored to your chosen career. Know exactly what skills to develop and when.",
    link: "/roadmap",
    color: "bg-secondary/10 text-secondary"
  },
  {
    icon: BarChart3,
    title: "Market Trends",
    description: "Stay updated with real-time job market data, trending skills, and emerging career opportunities in your field.",
    link: "/trends",
    color: "bg-accent/10 text-accent"
  },
  {
    icon: Award,
    title: "Exam Guidance",
    description: "Learn about entrance exams, eligibility criteria, cutoff scores, and admission processes for top colleges.",
    link: "/assessment",
    color: "bg-primary/10 text-primary"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Everything You Need for 
            <span className="gradient-text"> Career Success</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive platform guides you through every step of your career journey, 
            from initial assessment to landing your dream job.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.link}
              className="group glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="font-display font-semibold text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {feature.description}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
