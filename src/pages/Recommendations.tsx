import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  TrendingUp, 
  GraduationCap, 
  MapPin, 
  IndianRupee,
  Star,
  ArrowRight,
  FileCheck,
  Calendar,
  Loader2,
  AlertCircle,
  RefreshCw,
  Briefcase
} from "lucide-react";
import { AIInsightCard } from "@/components/ai/AIInsightCard";
import { useAIInsight } from "@/hooks/useAIInsight";
import { 
  getPersonalizedRecommendations, 
  AssessmentData, 
  CareerRecommendation, 
  CollegeRecommendation, 
  EntranceExam,
  RecommendationsData 
} from "@/lib/api/career-ai";

const Recommendations = () => {
  const navigate = useNavigate();
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendationsData | null>(null);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(true);
  const [recommendationsError, setRecommendationsError] = useState<string | null>(null);
  
  const [selectedCareer, setSelectedCareer] = useState<CareerRecommendation | null>(null);
  const { content: aiInsight, isLoading: isLoadingInsight, error: insightError, fetchInsight, reset } = useAIInsight();

  useEffect(() => {
    const data = localStorage.getItem("assessmentData");
    if (data) {
      const parsed = JSON.parse(data) as AssessmentData;
      setAssessmentData(parsed);
      fetchRecommendations(parsed);
    } else {
      setIsLoadingRecommendations(false);
      setRecommendationsError("No assessment data found. Please complete the assessment first.");
    }
  }, []);

  const fetchRecommendations = async (data: AssessmentData) => {
    setIsLoadingRecommendations(true);
    setRecommendationsError(null);
    
    const result = await getPersonalizedRecommendations(data);
    
    if (result.success && result.data) {
      setRecommendations(result.data);
    } else {
      setRecommendationsError(result.error || "Failed to generate recommendations");
    }
    
    setIsLoadingRecommendations(false);
  };

  const handleRetry = () => {
    if (assessmentData) {
      fetchRecommendations(assessmentData);
    }
  };

  const handleCareerClick = (career: CareerRecommendation) => {
    setSelectedCareer(career);
    fetchInsight("career_explain", {
      title: career.title,
      description: career.description,
      salary: career.salary,
      growth: career.growth,
      skills: career.skills,
      companies: career.companies,
    });
  };

  const handleRefreshInsight = () => {
    if (selectedCareer) {
      fetchInsight("career_explain", {
        title: selectedCareer.title,
        description: selectedCareer.description,
        salary: selectedCareer.salary,
        growth: selectedCareer.growth,
        skills: selectedCareer.skills,
        companies: selectedCareer.companies,
      });
    }
  };

  // Loading state
  if (isLoadingRecommendations) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="glass-card rounded-2xl p-12 text-center max-w-md">
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto">
                    <Sparkles className="w-10 h-10 text-secondary animate-pulse" />
                  </div>
                  <Loader2 className="w-24 h-24 text-secondary/30 animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                  Analyzing Your Profile
                </h2>
                <p className="text-muted-foreground">
                  Our AI is generating personalized career recommendations based on your interests, skills, and goals...
                </p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error state
  if (recommendationsError && !recommendations) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="glass-card rounded-2xl p-12 text-center max-w-md">
                <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-8 h-8 text-destructive" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                  Unable to Generate Recommendations
                </h2>
                <p className="text-muted-foreground mb-6">
                  {recommendationsError}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {assessmentData ? (
                    <Button onClick={handleRetry} variant="default">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Try Again
                    </Button>
                  ) : (
                    <Button onClick={() => navigate("/assessment")} variant="hero">
                      Take Assessment
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
          {recommendations?.careers && recommendations.careers.length > 0 && (
            <section className="mb-16">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-secondary" />
                Recommended Careers
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendations.careers.map((career) => (
                  <div 
                    key={career.id} 
                    className={`glass-card rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer border-2 ${
                      selectedCareer?.id === career.id ? "border-secondary" : "border-transparent"
                    }`}
                    onClick={() => handleCareerClick(career)}
                  >
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

                    {/* Job Roles */}
                    {career.jobRoles && career.jobRoles.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                          <Briefcase className="w-3 h-3" /> Job Roles:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {career.jobRoles.map((role) => (
                            <span key={role} className="px-2 py-0.5 rounded-md bg-primary/10 text-xs text-primary">
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

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

                    {career.reasoning && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <p className="text-xs text-secondary italic">"{career.reasoning}"</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* AI Career Insight */}
              {(selectedCareer || isLoadingInsight) && (
                <AIInsightCard
                  title={selectedCareer ? `AI Analysis: ${selectedCareer.title}` : "AI Analysis"}
                  content={aiInsight}
                  isLoading={isLoadingInsight}
                  error={insightError}
                  onRefresh={handleRefreshInsight}
                  className="mt-6"
                />
              )}

              <div className="text-center mt-6">
                <Link to="/career-comparison">
                  <Button variant="outline">
                    Compare Careers <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </section>
          )}

          {/* College Suggestions */}
          {recommendations?.colleges && recommendations.colleges.length > 0 && (
            <section className="mb-16">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-secondary" />
                Recommended Colleges
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendations.colleges.map((college) => (
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
                      {college.forCareers && college.forCareers.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <p className="text-xs text-muted-foreground mb-2">Best for:</p>
                          <div className="flex flex-wrap gap-1">
                            {college.forCareers.map((career) => (
                              <span key={career} className="px-2 py-0.5 rounded-md bg-secondary/10 text-xs text-secondary">
                                {career}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
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
          )}

          {/* Entrance Exams */}
          {recommendations?.entranceExams && recommendations.entranceExams.length > 0 && (
            <section className="mb-16">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <FileCheck className="w-6 h-6 text-secondary" />
                Entrance Exams & Eligibility
              </h2>
              <div className="glass-card rounded-2xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {recommendations.entranceExams.map((exam) => (
                    <div key={exam.name} className="p-4 rounded-xl bg-muted/50 border border-border">
                      <h4 className="font-semibold text-foreground mb-2">{exam.name}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {exam.date}
                        </div>
                        <p className="text-muted-foreground">{exam.eligibility}</p>
                        {exam.forColleges && exam.forColleges.length > 0 && (
                          <div className="pt-2 mt-2 border-t border-border">
                            <p className="text-xs text-muted-foreground mb-1">For:</p>
                            <p className="text-xs text-secondary">{exam.forColleges.join(", ")}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

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
