import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Flame, 
  Briefcase, 
  IndianRupee,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Sparkles,
  Users,
  Building2
} from "lucide-react";
import { AIInsightCard } from "@/components/ai/AIInsightCard";
import { useAIInsight } from "@/hooks/useAIInsight";

const trendingRoles = [
  { 
    title: "AI/ML Engineer", 
    growth: 45, 
    demand: "Very High", 
    avgSalary: "₹18-35 LPA",
    trend: "up",
    openings: "15,000+"
  },
  { 
    title: "Cloud Architect", 
    growth: 38, 
    demand: "Very High", 
    avgSalary: "₹25-50 LPA",
    trend: "up",
    openings: "12,000+"
  },
  { 
    title: "Data Engineer", 
    growth: 32, 
    demand: "High", 
    avgSalary: "₹15-30 LPA",
    trend: "up",
    openings: "20,000+"
  },
  { 
    title: "DevOps Engineer", 
    growth: 28, 
    demand: "High", 
    avgSalary: "₹12-28 LPA",
    trend: "up",
    openings: "18,000+"
  },
  { 
    title: "Cybersecurity Analyst", 
    growth: 35, 
    demand: "Very High", 
    avgSalary: "₹10-25 LPA",
    trend: "up",
    openings: "10,000+"
  },
  { 
    title: "Full Stack Developer", 
    growth: 22, 
    demand: "High", 
    avgSalary: "₹8-22 LPA",
    trend: "stable",
    openings: "50,000+"
  },
];

const highDemandCareers = [
  {
    category: "Technology",
    roles: [
      { name: "AI/ML Engineer", score: 95 },
      { name: "Cloud Solutions Architect", score: 92 },
      { name: "Data Scientist", score: 90 },
      { name: "Cybersecurity Expert", score: 88 },
    ]
  },
  {
    category: "Healthcare",
    roles: [
      { name: "Healthcare Data Analyst", score: 85 },
      { name: "Clinical Research", score: 82 },
      { name: "Health Informatics", score: 80 },
      { name: "Biomedical Engineer", score: 78 },
    ]
  },
  {
    category: "Finance",
    roles: [
      { name: "Fintech Developer", score: 88 },
      { name: "Quantitative Analyst", score: 85 },
      { name: "Risk Analyst", score: 80 },
      { name: "Blockchain Developer", score: 78 },
    ]
  },
];

const industryGrowth = [
  { 
    industry: "Artificial Intelligence", 
    growth: 42, 
    marketSize: "$126B by 2025",
    companies: "OpenAI, Google DeepMind, Meta AI"
  },
  { 
    industry: "Cloud Computing", 
    growth: 35, 
    marketSize: "$832B by 2025",
    companies: "AWS, Azure, Google Cloud"
  },
  { 
    industry: "Electric Vehicles", 
    growth: 45, 
    marketSize: "$802B by 2027",
    companies: "Tesla, Tata Motors, Ola Electric"
  },
  { 
    industry: "Fintech", 
    growth: 28, 
    marketSize: "$324B by 2026",
    companies: "Razorpay, PhonePe, Paytm"
  },
  { 
    industry: "EdTech", 
    growth: 32, 
    marketSize: "$404B by 2025",
    companies: "BYJU'S, Unacademy, upGrad"
  },
  { 
    industry: "Healthcare Tech", 
    growth: 25, 
    marketSize: "$660B by 2025",
    companies: "Practo, PharmEasy, 1mg"
  },
];

const skillsInDemand = [
  { skill: "Python", demand: 95, category: "Programming" },
  { skill: "Machine Learning", demand: 92, category: "AI/ML" },
  { skill: "AWS/Cloud", demand: 90, category: "Cloud" },
  { skill: "SQL", demand: 88, category: "Data" },
  { skill: "JavaScript/React", demand: 85, category: "Web Dev" },
  { skill: "Docker/Kubernetes", demand: 82, category: "DevOps" },
  { skill: "TensorFlow/PyTorch", demand: 80, category: "AI/ML" },
  { skill: "System Design", demand: 85, category: "Architecture" },
];

const Trends = () => {
  const { content: aiInsight, isLoading, error, fetchInsight } = useAIInsight();

  useEffect(() => {
    fetchInsight("trends", {
      trends: trendingRoles,
      industry: "Technology",
    });
  }, []);

  const handleRefresh = () => {
    fetchInsight("trends", {
      trends: trendingRoles,
      industry: "Technology",
    });
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <ArrowUpRight className="w-4 h-4 text-green-500" />;
      case "down": return <ArrowDownRight className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-yellow-500" />;
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
              <TrendingUp className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">Market Intelligence</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Job Market Trends 2026
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Stay ahead with real-time insights on trending careers, in-demand skills, and growing industries.
            </p>
          </div>

          {/* AI Market Analysis */}
          <AIInsightCard
            title="AI Market Trend Analysis"
            content={aiInsight}
            isLoading={isLoading}
            error={error}
            onRefresh={handleRefresh}
            className="mb-16"
          />

          {/* Trending Roles */}
          <section className="mb-16">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Flame className="w-6 h-6 text-accent" />
              Trending Job Roles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trendingRoles.map((role, index) => (
                <div key={role.title} className="glass-card rounded-xl p-5 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-foreground">{role.title}</h3>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(role.trend)}
                      <span className="text-sm font-medium text-green-500">+{role.growth}%</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Demand</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        role.demand === "Very High" ? "bg-green-500/10 text-green-500" : "bg-secondary/10 text-secondary"
                      }`}>
                        {role.demand}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Avg Salary</span>
                      <span className="font-medium text-foreground">{role.avgSalary}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Open Positions</span>
                      <span className="text-foreground">{role.openings}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* High Demand Careers by Category */}
          <section className="mb-16">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-primary" />
              High-Demand Careers by Industry
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {highDemandCareers.map((category) => (
                <div key={category.category} className="glass-card rounded-xl p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                    {category.category}
                  </h3>
                  <div className="space-y-3">
                    {category.roles.map((role) => (
                      <div key={role.name}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-foreground">{role.name}</span>
                          <span className="text-xs text-secondary font-medium">{role.score}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                            style={{ width: `${role.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills in Demand */}
          <section className="mb-16">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-secondary" />
              Most In-Demand Skills
            </h2>
            <div className="glass-card rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {skillsInDemand.map((item) => (
                  <div key={item.skill} className="p-4 rounded-lg bg-muted/50 border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">{item.skill}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
                        {item.category}
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-secondary rounded-full"
                        style={{ width: `${item.demand}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{item.demand}% demand</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Industry Growth */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Building2 className="w-6 h-6 text-accent" />
              Fastest Growing Industries
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {industryGrowth.map((industry) => (
                <div key={industry.industry} className="glass-card rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-foreground">{industry.industry}</h3>
                    <div className="flex items-center gap-1 text-green-500">
                      <ArrowUpRight className="w-4 h-4" />
                      <span className="text-sm font-medium">{industry.growth}%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Market Size:</span>
                      <span className="text-sm font-medium text-foreground">{industry.marketSize}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div>
                        <span className="text-sm text-muted-foreground">Key Players:</span>
                        <p className="text-sm text-foreground">{industry.companies}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Trends;
