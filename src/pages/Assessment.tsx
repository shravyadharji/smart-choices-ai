import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Target, 
  Brain, 
  MapPin, 
  GraduationCap,
  CheckCircle
} from "lucide-react";

interface AssessmentData {
  interests: string[];
  skills: string[];
  academicBackground: string;
  locationPreference: string;
  careerGoals: string;
  preferredWorkStyle: string;
  salaryExpectation: string;
}

const interestOptions = [
  "Technology & Coding",
  "Science & Research",
  "Arts & Design",
  "Business & Finance",
  "Healthcare & Medicine",
  "Law & Politics",
  "Education & Teaching",
  "Media & Communication",
  "Sports & Fitness",
  "Environment & Nature"
];

const skillOptions = [
  "Problem Solving",
  "Communication",
  "Leadership",
  "Creativity",
  "Analytical Thinking",
  "Teamwork",
  "Technical Skills",
  "Writing",
  "Public Speaking",
  "Research"
];

const steps = [
  { id: 1, title: "Interests", icon: Target },
  { id: 2, title: "Skills", icon: Brain },
  { id: 3, title: "Background", icon: GraduationCap },
  { id: 4, title: "Preferences", icon: MapPin },
];

const Assessment = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<AssessmentData>({
    interests: [],
    skills: [],
    academicBackground: "",
    locationPreference: "",
    careerGoals: "",
    preferredWorkStyle: "",
    salaryExpectation: "",
  });

  const toggleSelection = (field: "interests" | "skills", value: string) => {
    setData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = () => {
    // Store data and navigate to recommendations
    localStorage.setItem("assessmentData", JSON.stringify(data));
    navigate("/recommendations");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                What are your interests?
              </h2>
              <p className="text-muted-foreground">
                Select all areas that excite you (pick at least 2)
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {interestOptions.map((interest) => (
                <button
                  key={interest}
                  onClick={() => toggleSelection("interests", interest)}
                  className={`p-4 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${
                    data.interests.includes(interest)
                      ? "border-secondary bg-secondary/10 text-secondary"
                      : "border-border bg-card text-foreground hover:border-secondary/50"
                  }`}
                >
                  {data.interests.includes(interest) && (
                    <CheckCircle className="w-4 h-4 inline mr-2" />
                  )}
                  {interest}
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                What are your strengths?
              </h2>
              <p className="text-muted-foreground">
                Select skills you excel at or want to develop
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {skillOptions.map((skill) => (
                <button
                  key={skill}
                  onClick={() => toggleSelection("skills", skill)}
                  className={`p-4 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${
                    data.skills.includes(skill)
                      ? "border-secondary bg-secondary/10 text-secondary"
                      : "border-border bg-card text-foreground hover:border-secondary/50"
                  }`}
                >
                  {data.skills.includes(skill) && (
                    <CheckCircle className="w-4 h-4 inline mr-2" />
                  )}
                  {skill}
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 max-w-xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                Tell us about your academics
              </h2>
              <p className="text-muted-foreground">
                Your educational background helps us recommend suitable paths
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="education">Current Education Level</Label>
                <Select 
                  value={data.academicBackground} 
                  onValueChange={(value) => setData(prev => ({ ...prev, academicBackground: value }))}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select your education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10th">10th Standard</SelectItem>
                    <SelectItem value="12th-science">12th Science</SelectItem>
                    <SelectItem value="12th-commerce">12th Commerce</SelectItem>
                    <SelectItem value="12th-arts">12th Arts</SelectItem>
                    <SelectItem value="undergraduate">Undergraduate</SelectItem>
                    <SelectItem value="graduate">Graduate</SelectItem>
                    <SelectItem value="postgraduate">Post Graduate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="goals">Career Goals & Aspirations</Label>
                <Textarea
                  id="goals"
                  placeholder="Describe your dream career or what you want to achieve..."
                  className="mt-2 min-h-[120px]"
                  value={data.careerGoals}
                  onChange={(e) => setData(prev => ({ ...prev, careerGoals: e.target.value }))}
                />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 max-w-xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                Your Preferences
              </h2>
              <p className="text-muted-foreground">
                Help us understand your work style and location preferences
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="location">Preferred Location</Label>
                <Select 
                  value={data.locationPreference} 
                  onValueChange={(value) => setData(prev => ({ ...prev, locationPreference: value }))}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select preferred location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metro">Metro Cities (Mumbai, Delhi, Bangalore)</SelectItem>
                    <SelectItem value="tier2">Tier 2 Cities</SelectItem>
                    <SelectItem value="hometown">Stay near hometown</SelectItem>
                    <SelectItem value="abroad">Open to abroad</SelectItem>
                    <SelectItem value="remote">Remote/Work from home</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="workstyle">Preferred Work Style</Label>
                <Select 
                  value={data.preferredWorkStyle} 
                  onValueChange={(value) => setData(prev => ({ ...prev, preferredWorkStyle: value }))}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select work style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corporate">Corporate Environment</SelectItem>
                    <SelectItem value="startup">Startup Culture</SelectItem>
                    <SelectItem value="freelance">Freelance/Self-employed</SelectItem>
                    <SelectItem value="government">Government Job</SelectItem>
                    <SelectItem value="research">Research & Academia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="salary">Salary Expectation (Per Annum)</Label>
                <Select 
                  value={data.salaryExpectation} 
                  onValueChange={(value) => setData(prev => ({ ...prev, salaryExpectation: value }))}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select salary range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3-5">₹3-5 LPA</SelectItem>
                    <SelectItem value="5-10">₹5-10 LPA</SelectItem>
                    <SelectItem value="10-20">₹10-20 LPA</SelectItem>
                    <SelectItem value="20-50">₹20-50 LPA</SelectItem>
                    <SelectItem value="50+">₹50+ LPA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
      default:
        return null;
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
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">AI Career Assessment</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Discover Your Perfect Career Path
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Answer a few questions and let our AI analyze your profile to recommend the best career options for you.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center gap-2">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                        currentStep >= step.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium hidden sm:inline">{step.title}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-8 h-0.5 mx-1 ${currentStep > step.id ? "bg-primary" : "bg-muted"}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Content */}
          <div className="glass-card rounded-2xl p-6 sm:p-10 max-w-4xl mx-auto">
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(prev => prev - 1)}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentStep < 4 ? (
                <Button
                  variant="default"
                  onClick={() => setCurrentStep(prev => prev + 1)}
                >
                  Next Step
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button variant="hero" onClick={handleSubmit}>
                  Evaluate My Career Path
                  <Sparkles className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Assessment;
