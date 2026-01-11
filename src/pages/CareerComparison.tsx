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
  GitCompare, 
  TrendingUp, 
  IndianRupee, 
  Clock, 
  Briefcase,
  GraduationCap,
  Target,
  CheckCircle,
  XCircle
} from "lucide-react";

const careers = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    salary: { entry: "₹6-12 LPA", mid: "₹15-30 LPA", senior: "₹35-70 LPA" },
    growth: 25,
    demand: "Very High",
    workLifeBalance: 7,
    remoteWork: "Highly Available",
    education: "B.Tech/B.E. in CS/IT or equivalent",
    skills: ["Programming", "Problem Solving", "System Design", "Databases"],
    pros: ["High salary", "Remote work options", "Creative problem solving", "High demand"],
    cons: ["Long hours sometimes", "Continuous learning required", "Can be stressful"],
    futureScope: "Excellent - AI, Cloud, and Digital Transformation driving growth"
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    salary: { entry: "₹8-15 LPA", mid: "₹20-40 LPA", senior: "₹50-90 LPA" },
    growth: 35,
    demand: "Very High",
    workLifeBalance: 7,
    remoteWork: "Highly Available",
    education: "B.Tech + Masters preferred, Statistics/ML background",
    skills: ["Python/R", "Machine Learning", "Statistics", "Data Visualization"],
    pros: ["Highest paying tech job", "Cutting edge work", "Business impact", "Growing field"],
    cons: ["Requires strong math", "Data quality issues", "Explaining results to non-tech"],
    futureScope: "Exceptional - AI/ML revolution creating massive demand"
  },
  {
    id: "product-manager",
    title: "Product Manager",
    salary: { entry: "₹10-18 LPA", mid: "₹25-50 LPA", senior: "₹60-1.2 Cr" },
    growth: 20,
    demand: "High",
    workLifeBalance: 6,
    remoteWork: "Moderately Available",
    education: "Any degree, MBA preferred",
    skills: ["Communication", "Strategy", "User Research", "Data Analysis"],
    pros: ["Leadership role", "High impact", "Cross-functional work", "Great pay"],
    cons: ["No direct authority", "Responsibility without control", "High pressure"],
    futureScope: "Strong - Every company needs PMs for digital products"
  },
  {
    id: "ux-designer",
    title: "UX Designer",
    salary: { entry: "₹5-10 LPA", mid: "₹12-25 LPA", senior: "₹30-50 LPA" },
    growth: 22,
    demand: "High",
    workLifeBalance: 8,
    remoteWork: "Highly Available",
    education: "Design degree or bootcamp, portfolio matters most",
    skills: ["User Research", "Wireframing", "Prototyping", "Visual Design"],
    pros: ["Creative work", "User impact", "Good work-life balance", "Portfolio-based hiring"],
    cons: ["Subjective feedback", "Design by committee", "Explaining design decisions"],
    futureScope: "Growing - User experience becoming competitive differentiator"
  },
  {
    id: "investment-banker",
    title: "Investment Banker",
    salary: { entry: "₹12-25 LPA", mid: "₹35-70 LPA", senior: "₹1-3 Cr" },
    growth: 15,
    demand: "Moderate",
    workLifeBalance: 3,
    remoteWork: "Limited",
    education: "MBA from top B-school, CA/CFA preferred",
    skills: ["Financial Modeling", "Valuation", "Excel", "Presentation"],
    pros: ["Very high pay", "Prestigious", "Exit opportunities", "Fast-paced"],
    cons: ["80+ hour weeks", "High stress", "Competitive", "Poor work-life balance"],
    futureScope: "Stable - Always needed for M&A, IPOs, and capital markets"
  },
];

const CareerComparison = () => {
  const [career1, setCareer1] = useState<string>("");
  const [career2, setCareer2] = useState<string>("");

  const selectedCareer1 = careers.find(c => c.id === career1);
  const selectedCareer2 = careers.find(c => c.id === career2);

  const renderComparisonRow = (label: string, value1: any, value2: any, icon: React.ReactNode) => (
    <div className="grid grid-cols-3 gap-4 py-4 border-b border-border">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="font-medium">{label}</span>
      </div>
      <div className="text-center text-foreground">{value1 || "-"}</div>
      <div className="text-center text-foreground">{value2 || "-"}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 mb-4">
              <GitCompare className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">Career Comparison Tool</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Compare Careers Side-by-Side
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Evaluate different career paths based on salary, growth, work-life balance, and future scope.
            </p>
          </div>

          {/* Career Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Career 1</label>
              <Select value={career1} onValueChange={setCareer1}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select first career" />
                </SelectTrigger>
                <SelectContent>
                  {careers.map((career) => (
                    <SelectItem key={career.id} value={career.id} disabled={career.id === career2}>
                      {career.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Career 2</label>
              <Select value={career2} onValueChange={setCareer2}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select second career" />
                </SelectTrigger>
                <SelectContent>
                  {careers.map((career) => (
                    <SelectItem key={career.id} value={career.id} disabled={career.id === career1}>
                      {career.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Comparison Table */}
          {selectedCareer1 && selectedCareer2 ? (
            <div className="glass-card rounded-2xl p-6 overflow-x-auto">
              {/* Header */}
              <div className="grid grid-cols-3 gap-4 pb-4 border-b-2 border-primary/20 mb-4">
                <div className="text-muted-foreground font-medium">Criteria</div>
                <div className="text-center">
                  <h3 className="font-display text-lg font-semibold text-primary">{selectedCareer1.title}</h3>
                </div>
                <div className="text-center">
                  <h3 className="font-display text-lg font-semibold text-secondary">{selectedCareer2.title}</h3>
                </div>
              </div>

              {/* Salary */}
              {renderComparisonRow(
                "Entry Level Salary",
                selectedCareer1.salary.entry,
                selectedCareer2.salary.entry,
                <IndianRupee className="w-4 h-4" />
              )}
              {renderComparisonRow(
                "Mid Level Salary",
                selectedCareer1.salary.mid,
                selectedCareer2.salary.mid,
                <IndianRupee className="w-4 h-4" />
              )}
              {renderComparisonRow(
                "Senior Level Salary",
                selectedCareer1.salary.senior,
                selectedCareer2.salary.senior,
                <IndianRupee className="w-4 h-4" />
              )}

              {/* Growth & Demand */}
              {renderComparisonRow(
                "Annual Growth Rate",
                `${selectedCareer1.growth}%`,
                `${selectedCareer2.growth}%`,
                <TrendingUp className="w-4 h-4" />
              )}
              {renderComparisonRow(
                "Market Demand",
                selectedCareer1.demand,
                selectedCareer2.demand,
                <Target className="w-4 h-4" />
              )}

              {/* Work Life */}
              {renderComparisonRow(
                "Work-Life Balance",
                `${selectedCareer1.workLifeBalance}/10`,
                `${selectedCareer2.workLifeBalance}/10`,
                <Clock className="w-4 h-4" />
              )}
              {renderComparisonRow(
                "Remote Work",
                selectedCareer1.remoteWork,
                selectedCareer2.remoteWork,
                <Briefcase className="w-4 h-4" />
              )}

              {/* Education */}
              {renderComparisonRow(
                "Education Required",
                selectedCareer1.education,
                selectedCareer2.education,
                <GraduationCap className="w-4 h-4" />
              )}

              {/* Skills */}
              <div className="grid grid-cols-3 gap-4 py-4 border-b border-border">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Target className="w-4 h-4" />
                  <span className="font-medium">Key Skills</span>
                </div>
                <div className="flex flex-wrap gap-1 justify-center">
                  {selectedCareer1.skills.map((skill) => (
                    <span key={skill} className="px-2 py-1 rounded-md bg-primary/10 text-xs text-primary">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1 justify-center">
                  {selectedCareer2.skills.map((skill) => (
                    <span key={skill} className="px-2 py-1 rounded-md bg-secondary/10 text-xs text-secondary">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pros */}
              <div className="grid grid-cols-3 gap-4 py-4 border-b border-border">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="font-medium">Pros</span>
                </div>
                <div className="space-y-1">
                  {selectedCareer1.pros.map((pro) => (
                    <div key={pro} className="text-sm text-green-600 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> {pro}
                    </div>
                  ))}
                </div>
                <div className="space-y-1">
                  {selectedCareer2.pros.map((pro) => (
                    <div key={pro} className="text-sm text-green-600 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> {pro}
                    </div>
                  ))}
                </div>
              </div>

              {/* Cons */}
              <div className="grid grid-cols-3 gap-4 py-4 border-b border-border">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span className="font-medium">Cons</span>
                </div>
                <div className="space-y-1">
                  {selectedCareer1.cons.map((con) => (
                    <div key={con} className="text-sm text-red-500 flex items-center gap-1">
                      <XCircle className="w-3 h-3" /> {con}
                    </div>
                  ))}
                </div>
                <div className="space-y-1">
                  {selectedCareer2.cons.map((con) => (
                    <div key={con} className="text-sm text-red-500 flex items-center gap-1">
                      <XCircle className="w-3 h-3" /> {con}
                    </div>
                  ))}
                </div>
              </div>

              {/* Future Scope */}
              <div className="grid grid-cols-3 gap-4 py-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-medium">Future Scope</span>
                </div>
                <div className="text-sm text-foreground">{selectedCareer1.futureScope}</div>
                <div className="text-sm text-foreground">{selectedCareer2.futureScope}</div>
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-12 text-center">
              <GitCompare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                Select Two Careers to Compare
              </h3>
              <p className="text-muted-foreground">
                Use the dropdowns above to select careers and see a detailed side-by-side comparison.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CareerComparison;
