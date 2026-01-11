import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  TrendingUp, 
  GraduationCap, 
  MapPin, 
  Clock, 
  IndianRupee,
  Building2,
  Star,
  ArrowRight,
  FileCheck,
  Calendar
} from "lucide-react";

const careerSuggestions = [
  {
    id: 1,
    title: "Software Engineer",
    match: 95,
    description: "Build innovative software solutions using cutting-edge technologies",
    salary: "₹8-25 LPA",
    growth: "High",
    skills: ["JavaScript", "Python", "Problem Solving", "System Design"],
    companies: ["Google", "Microsoft", "Amazon", "Flipkart"],
  },
  {
    id: 2,
    title: "Data Scientist",
    match: 88,
    description: "Analyze complex data to derive insights and build predictive models",
    salary: "₹10-30 LPA",
    growth: "Very High",
    skills: ["Python", "Machine Learning", "Statistics", "SQL"],
    companies: ["Meta", "Netflix", "Uber", "Swiggy"],
  },
  {
    id: 3,
    title: "Product Manager",
    match: 82,
    description: "Lead product development and strategy from ideation to launch",
    salary: "₹15-40 LPA",
    growth: "High",
    skills: ["Communication", "Strategy", "Analytics", "Leadership"],
    companies: ["Razorpay", "PhonePe", "Zomato", "CRED"],
  },
];

const collegeSuggestions = [
  {
    id: 1,
    name: "IIT Bombay",
    location: "Mumbai, Maharashtra",
    ranking: "#1 in Engineering",
    fees: "₹2.5L/year",
    cutoff: "JEE Advanced Rank < 500",
    placement: "₹25 LPA avg",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&q=80"
  },
  {
    id: 2,
    name: "IIT Delhi",
    location: "New Delhi",
    ranking: "#2 in Engineering",
    fees: "₹2.5L/year",
    cutoff: "JEE Advanced Rank < 800",
    placement: "₹22 LPA avg",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&q=80"
  },
  {
    id: 3,
    name: "BITS Pilani",
    location: "Pilani, Rajasthan",
    ranking: "#5 in Engineering",
    fees: "₹5L/year",
    cutoff: "BITSAT Score > 350",
    placement: "₹18 LPA avg",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80"
  },
];

const entranceExams = [
  { name: "JEE Main", date: "January & April", eligibility: "12th with PCM (75%)" },
  { name: "JEE Advanced", date: "May", eligibility: "Top 2.5L in JEE Main" },
  { name: "BITSAT", date: "May-June", eligibility: "12th with PCM (75%)" },
  { name: "VITEEE", date: "April", eligibility: "12th with PCM (60%)" },
];

const Recommendations = () => {
  const [assessmentData, setAssessmentData] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("assessmentData");
    if (data) {
      setAssessmentData(JSON.parse(data));
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 mb-4">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">AI Analysis Complete</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Your Personalized Career Path
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Based on your interests, skills, and preferences, here are our top recommendations for you.
            </p>
          </div>

          {/* Career Suggestions */}
          <section className="mb-16">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-secondary" />
              Recommended Careers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {careerSuggestions.map((career) => (
                <div key={career.id} className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      {career.title}
                    </h3>
                    <div className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
                      {career.match}% Match
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">{career.description}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <IndianRupee className="w-4 h-4 text-accent" />
                      <span className="text-foreground font-medium">{career.salary}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="w-4 h-4 text-secondary" />
                      <span className="text-foreground">Growth: {career.growth}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {career.skills.map((skill) => (
                      <span key={skill} className="px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">Top hiring companies:</p>
                    <p className="text-sm text-foreground">{career.companies.join(", ")}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link to="/career-comparison">
                <Button variant="outline">
                  Compare Careers <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </section>

          {/* College Suggestions */}
          <section className="mb-16">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-secondary" />
              Recommended Colleges
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {collegeSuggestions.map((college) => (
                <div key={college.id} className="glass-card rounded-2xl overflow-hidden hover:shadow-lg transition-all">
                  <div 
                    className="h-40 bg-cover bg-center"
                    style={{ backgroundImage: `url(${college.image})` }}
                  />
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                      {college.name}
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {college.location}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Star className="w-4 h-4" />
                        {college.ranking}
                      </div>
                      <div className="flex items-center gap-2 text-foreground font-medium">
                        <IndianRupee className="w-4 h-4" />
                        {college.fees}
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground mb-1">Cutoff:</p>
                      <p className="text-sm text-foreground">{college.cutoff}</p>
                      <p className="text-xs text-muted-foreground mt-2 mb-1">Avg Placement:</p>
                      <p className="text-sm font-medium text-secondary">{college.placement}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link to="/college-comparison">
                <Button variant="outline">
                  Compare Colleges <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </section>

          {/* Entrance Exams */}
          <section className="mb-16">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <FileCheck className="w-6 h-6 text-secondary" />
              Entrance Exams & Eligibility
            </h2>
            <div className="glass-card rounded-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {entranceExams.map((exam) => (
                  <div key={exam.name} className="p-4 rounded-xl bg-muted/50 border border-border">
                    <h4 className="font-semibold text-foreground mb-2">{exam.name}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {exam.date}
                      </div>
                      <p className="text-muted-foreground">{exam.eligibility}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Next Steps CTA */}
          <section className="text-center">
            <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="font-display text-xl font-bold text-foreground mb-4">
                Ready to Start Your Journey?
              </h3>
              <p className="text-muted-foreground mb-6">
                Explore our skill roadmap to plan your learning path, or compare careers in detail.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/roadmap">
                  <Button variant="hero">
                    View Skill Roadmap
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/trends">
                  <Button variant="outline">
                    Explore Market Trends
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Recommendations;
