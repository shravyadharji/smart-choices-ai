import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Map, 
  BookOpen, 
  Code, 
  Briefcase, 
  Award,
  ChevronRight,
  CheckCircle2,
  Clock,
  Target
} from "lucide-react";

const careerRoadmaps = {
  "software-engineer": {
    title: "Software Engineer",
    duration: "4 Years (B.Tech)",
    years: [
      {
        year: "Year 1",
        title: "Foundation Building",
        skills: [
          { name: "Programming Basics (C/C++/Python)", importance: "Critical" },
          { name: "Data Structures Fundamentals", importance: "Critical" },
          { name: "Mathematics (Discrete, Linear Algebra)", importance: "High" },
          { name: "Version Control (Git)", importance: "High" },
        ],
        projects: ["Calculator App", "Simple CLI Games", "Basic CRUD Application"],
        certifications: ["CS50 (Harvard)", "Google IT Support"],
        tips: "Focus on problem-solving skills. Solve 100+ easy problems on LeetCode/HackerRank."
      },
      {
        year: "Year 2",
        title: "Core Development",
        skills: [
          { name: "Advanced Data Structures", importance: "Critical" },
          { name: "Algorithms & Complexity", importance: "Critical" },
          { name: "Database Management (SQL/NoSQL)", importance: "High" },
          { name: "Web Development Basics", importance: "Medium" },
        ],
        projects: ["Full-Stack Web App", "Database-Driven Application", "API Development"],
        certifications: ["AWS Cloud Practitioner", "Meta Frontend Developer"],
        tips: "Start contributing to open source. Build a strong GitHub profile with 3-5 quality projects."
      },
      {
        year: "Year 3",
        title: "Specialization",
        skills: [
          { name: "System Design Basics", importance: "Critical" },
          { name: "Chosen Tech Stack Mastery", importance: "Critical" },
          { name: "Cloud Services (AWS/GCP)", importance: "High" },
          { name: "DevOps & CI/CD", importance: "Medium" },
        ],
        projects: ["Scalable Microservices App", "Real-time Chat Application", "E-commerce Platform"],
        certifications: ["AWS Solutions Architect", "Docker/Kubernetes"],
        tips: "Apply for summer internships at top tech companies. Start mock interviews."
      },
      {
        year: "Year 4",
        title: "Industry Readiness",
        skills: [
          { name: "Advanced System Design", importance: "Critical" },
          { name: "Interview Prep (DSA + System Design)", importance: "Critical" },
          { name: "Communication & Soft Skills", importance: "High" },
          { name: "Industry Best Practices", importance: "High" },
        ],
        projects: ["Capstone Project", "Portfolio Website", "Open Source Contributions"],
        certifications: ["Google Cloud Professional", "Specialty Certifications"],
        tips: "Solve 300+ medium/hard problems. Do 20+ mock interviews. Target PPOs from internship."
      }
    ]
  },
  "data-scientist": {
    title: "Data Scientist",
    duration: "4 Years (B.Tech + Self Learning)",
    years: [
      {
        year: "Year 1",
        title: "Mathematics & Programming",
        skills: [
          { name: "Python Programming", importance: "Critical" },
          { name: "Statistics & Probability", importance: "Critical" },
          { name: "Linear Algebra", importance: "High" },
          { name: "SQL Basics", importance: "High" },
        ],
        projects: ["Data Analysis with Pandas", "Statistical Analysis Project", "SQL Data Exploration"],
        certifications: ["Google Data Analytics", "IBM Data Science"],
        tips: "Build strong mathematical foundations. Statistics is the backbone of data science."
      },
      {
        year: "Year 2",
        title: "Machine Learning Basics",
        skills: [
          { name: "Machine Learning Algorithms", importance: "Critical" },
          { name: "Data Visualization", importance: "High" },
          { name: "Feature Engineering", importance: "High" },
          { name: "Model Evaluation", importance: "Medium" },
        ],
        projects: ["Regression Models", "Classification Projects", "Kaggle Competitions"],
        certifications: ["Andrew Ng's ML Course", "Deep Learning Specialization"],
        tips: "Participate in Kaggle competitions. Start with beginner-friendly competitions."
      },
      {
        year: "Year 3",
        title: "Advanced ML & Deep Learning",
        skills: [
          { name: "Deep Learning (CNN, RNN)", importance: "Critical" },
          { name: "NLP & Computer Vision", importance: "High" },
          { name: "Big Data Tools (Spark)", importance: "Medium" },
          { name: "MLOps Basics", importance: "Medium" },
        ],
        projects: ["Image Classification", "NLP Chatbot", "Time Series Forecasting"],
        certifications: ["TensorFlow Developer", "AWS ML Specialty"],
        tips: "Build end-to-end ML projects. Focus on one domain (NLP/CV) deeply."
      },
      {
        year: "Year 4",
        title: "Industry Transition",
        skills: [
          { name: "Production ML Systems", importance: "Critical" },
          { name: "A/B Testing & Experimentation", importance: "High" },
          { name: "Business Communication", importance: "High" },
          { name: "Domain Knowledge", importance: "High" },
        ],
        projects: ["Full ML Pipeline Project", "Research Paper Implementation", "Business Impact Project"],
        certifications: ["Google ML Engineer", "Azure Data Scientist"],
        tips: "Build a portfolio with 5+ complete projects. Target analytics/ML internships."
      }
    ]
  },
  "product-manager": {
    title: "Product Manager",
    duration: "4 Years (Any Degree + MBA Preferred)",
    years: [
      {
        year: "Year 1",
        title: "Foundation & Exploration",
        skills: [
          { name: "Business Fundamentals", importance: "High" },
          { name: "Basic Technical Understanding", importance: "High" },
          { name: "Communication Skills", importance: "High" },
          { name: "Excel & Data Analysis", importance: "Medium" },
        ],
        projects: ["Product Teardown Analysis", "Market Research Project", "User Survey Analysis"],
        certifications: ["Google Analytics", "SQL for Business"],
        tips: "Join product clubs. Analyze products you use daily. Write product reviews."
      },
      {
        year: "Year 2",
        title: "Product Thinking",
        skills: [
          { name: "User Research Methods", importance: "Critical" },
          { name: "Wireframing & Prototyping", importance: "High" },
          { name: "Metrics & Analytics", importance: "High" },
          { name: "Agile Methodology", importance: "Medium" },
        ],
        projects: ["Design a New Feature", "Competitive Analysis", "Product Strategy Document"],
        certifications: ["Product School Certifications", "Figma/Sketch"],
        tips: "Learn to use Figma. Practice creating PRDs. Follow product leaders on Twitter."
      },
      {
        year: "Year 3",
        title: "Hands-on Experience",
        skills: [
          { name: "Roadmap Planning", importance: "Critical" },
          { name: "Stakeholder Management", importance: "High" },
          { name: "Data-Driven Decisions", importance: "High" },
          { name: "A/B Testing", importance: "Medium" },
        ],
        projects: ["APM Internship", "Side Project Launch", "Growth Experiment"],
        certifications: ["Reforge Programs", "Product-Led Growth"],
        tips: "Apply for APM programs. Build and launch a side project to demonstrate skills."
      },
      {
        year: "Year 4",
        title: "Career Launch",
        skills: [
          { name: "Product Strategy", importance: "Critical" },
          { name: "Leadership & Influence", importance: "High" },
          { name: "Technical Depth", importance: "High" },
          { name: "Interview Preparation", importance: "Critical" },
        ],
        projects: ["Full Product Case Study", "MBA/APM Applications", "Product Portfolio"],
        certifications: ["Executive PM Programs", "Industry Specialization"],
        tips: "Prepare for PM interviews (case studies, metrics, product sense). Target APM roles."
      }
    ]
  }
};

const Roadmap = () => {
  const [selectedCareer, setSelectedCareer] = useState<string>("software-engineer");

  const roadmap = careerRoadmaps[selectedCareer as keyof typeof careerRoadmaps];

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "Critical": return "bg-red-500/10 text-red-500 border-red-500/20";
      case "High": return "bg-accent/10 text-accent border-accent/20";
      case "Medium": return "bg-secondary/10 text-secondary border-secondary/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 mb-4">
              <Map className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">Skill Development Roadmap</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Your Career Skill Roadmap
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Follow this year-by-year guide to build the skills needed for your dream career.
            </p>
          </div>

          {/* Career Selector */}
          <div className="max-w-md mx-auto mb-12">
            <label className="text-sm font-medium text-muted-foreground mb-2 block">Select Career Path</label>
            <Select value={selectedCareer} onValueChange={setSelectedCareer}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select career" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="software-engineer">Software Engineer</SelectItem>
                <SelectItem value="data-scientist">Data Scientist</SelectItem>
                <SelectItem value="product-manager">Product Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Roadmap Header */}
          <div className="glass-card rounded-2xl p-6 mb-8 text-center">
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              {roadmap.title} Roadmap
            </h2>
            <p className="text-muted-foreground">
              <Clock className="w-4 h-4 inline mr-1" />
              Duration: {roadmap.duration}
            </p>
          </div>

          {/* Year-wise Roadmap */}
          <div className="space-y-8">
            {roadmap.years.map((yearData, index) => (
              <div key={yearData.year} className="relative">
                {/* Connection Line */}
                {index < roadmap.years.length - 1 && (
                  <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary hidden md:block" />
                )}

                <div className="glass-card rounded-2xl p-6 md:ml-16 relative">
                  {/* Year Badge */}
                  <div className="absolute -left-20 top-6 hidden md:flex w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">{index + 1}</span>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold md:hidden">
                      {yearData.year}
                    </span>
                    <h3 className="font-display text-xl font-bold text-foreground">
                      <span className="hidden md:inline">{yearData.year}: </span>{yearData.title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Skills */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Target className="w-5 h-5 text-primary" />
                        <h4 className="font-semibold text-foreground">Skills to Learn</h4>
                      </div>
                      <div className="space-y-2">
                        {yearData.skills.map((skill) => (
                          <div key={skill.name} className="flex items-center justify-between gap-2">
                            <span className="text-sm text-foreground">{skill.name}</span>
                            <span className={`px-2 py-0.5 rounded text-xs border ${getImportanceColor(skill.importance)}`}>
                              {skill.importance}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Projects */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Code className="w-5 h-5 text-secondary" />
                        <h4 className="font-semibold text-foreground">Projects</h4>
                      </div>
                      <ul className="space-y-2">
                        {yearData.projects.map((project) => (
                          <li key={project} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-secondary" />
                            {project}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Certifications */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Award className="w-5 h-5 text-accent" />
                        <h4 className="font-semibold text-foreground">Certifications</h4>
                      </div>
                      <ul className="space-y-2">
                        {yearData.certifications.map((cert) => (
                          <li key={cert} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Award className="w-4 h-4 text-accent" />
                            {cert}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">💡 Pro Tip:</span> {yearData.tips}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Roadmap;
