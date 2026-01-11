import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Building2, 
  MapPin, 
  Star, 
  IndianRupee, 
  Users,
  Home,
  Utensils,
  Shield,
  TrendingUp,
  Briefcase,
  CheckCircle
} from "lucide-react";

const colleges = [
  {
    id: "iit-bombay",
    name: "IIT Bombay",
    location: "Mumbai, Maharashtra",
    type: "Government",
    ranking: 1,
    fees: "₹2.5 Lakhs/year",
    campus: { size: "550 acres", rating: 9 },
    hostel: { availability: "100%", rating: 8 },
    food: { mess: "Veg & Non-Veg", rating: 7 },
    safety: { score: 9, features: ["24/7 Security", "CCTV", "Medical Center"] },
    placement: { avg: "₹25 LPA", highest: "₹2.5 Cr", percentage: "95%" },
    companies: ["Google", "Microsoft", "Goldman Sachs", "Amazon"],
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&q=80"
  },
  {
    id: "iit-delhi",
    name: "IIT Delhi",
    location: "New Delhi",
    type: "Government",
    ranking: 2,
    fees: "₹2.5 Lakhs/year",
    campus: { size: "320 acres", rating: 9 },
    hostel: { availability: "100%", rating: 8 },
    food: { mess: "Veg & Non-Veg", rating: 7 },
    safety: { score: 9, features: ["24/7 Security", "CCTV", "Police Post"] },
    placement: { avg: "₹22 LPA", highest: "₹2.0 Cr", percentage: "93%" },
    companies: ["Meta", "Apple", "McKinsey", "Morgan Stanley"],
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&q=80"
  },
  {
    id: "bits-pilani",
    name: "BITS Pilani",
    location: "Pilani, Rajasthan",
    type: "Private",
    ranking: 5,
    fees: "₹5 Lakhs/year",
    campus: { size: "328 acres", rating: 8 },
    hostel: { availability: "100%", rating: 9 },
    food: { mess: "Multiple Options", rating: 8 },
    safety: { score: 9, features: ["Gated Campus", "24/7 Security", "Hospital"] },
    placement: { avg: "₹18 LPA", highest: "₹1.5 Cr", percentage: "90%" },
    companies: ["Samsung", "Adobe", "Uber", "Flipkart"],
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80"
  },
  {
    id: "vit-vellore",
    name: "VIT Vellore",
    location: "Vellore, Tamil Nadu",
    type: "Private",
    ranking: 12,
    fees: "₹4 Lakhs/year",
    campus: { size: "372 acres", rating: 8 },
    hostel: { availability: "100%", rating: 8 },
    food: { mess: "Multiple Cuisines", rating: 8 },
    safety: { score: 8, features: ["Gated Campus", "Security", "Health Center"] },
    placement: { avg: "₹8 LPA", highest: "₹50 LPA", percentage: "85%" },
    companies: ["TCS", "Infosys", "Cognizant", "Wipro"],
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&q=80"
  },
  {
    id: "nit-trichy",
    name: "NIT Trichy",
    location: "Tiruchirappalli, Tamil Nadu",
    type: "Government",
    ranking: 8,
    fees: "₹1.5 Lakhs/year",
    campus: { size: "800 acres", rating: 9 },
    hostel: { availability: "100%", rating: 7 },
    food: { mess: "South Indian focus", rating: 7 },
    safety: { score: 8, features: ["Campus Police", "Security Gates", "Emergency Services"] },
    placement: { avg: "₹12 LPA", highest: "₹1 Cr", percentage: "92%" },
    companies: ["Intel", "Texas Instruments", "Oracle", "SAP"],
    image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&q=80"
  },
];

const CollegeComparison = () => {
  const [college1, setCollege1] = useState<string>("");
  const [college2, setCollege2] = useState<string>("");

  const selectedCollege1 = colleges.find(c => c.id === college1);
  const selectedCollege2 = colleges.find(c => c.id === college2);

  const renderRatingBar = (rating: number, color: string) => (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} rounded-full transition-all duration-500`}
          style={{ width: `${rating * 10}%` }}
        />
      </div>
      <span className="text-sm font-medium">{rating}/10</span>
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
              <Building2 className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">College Comparison Tool</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Compare Colleges Side-by-Side
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Evaluate colleges based on campus, hostel, food, safety, and placement records.
            </p>
          </div>

          {/* College Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">College 1</label>
              <Select value={college1} onValueChange={setCollege1}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select first college" />
                </SelectTrigger>
                <SelectContent>
                  {colleges.map((college) => (
                    <SelectItem key={college.id} value={college.id} disabled={college.id === college2}>
                      {college.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">College 2</label>
              <Select value={college2} onValueChange={setCollege2}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select second college" />
                </SelectTrigger>
                <SelectContent>
                  {colleges.map((college) => (
                    <SelectItem key={college.id} value={college.id} disabled={college.id === college1}>
                      {college.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Comparison Content */}
          {selectedCollege1 && selectedCollege2 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[selectedCollege1, selectedCollege2].map((college, index) => (
                <div key={college.id} className="glass-card rounded-2xl overflow-hidden">
                  {/* College Image */}
                  <div 
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${college.image})` }}
                  />
                  
                  {/* College Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-display text-xl font-bold text-foreground">
                          {college.name}
                        </h3>
                        <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                          <MapPin className="w-4 h-4" />
                          {college.location}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-accent/10 text-accent">
                        <Star className="w-4 h-4" />
                        <span className="font-semibold">#{college.ranking}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-3 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground">Type</p>
                        <p className="font-semibold text-foreground">{college.type}</p>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground">Fees</p>
                        <p className="font-semibold text-foreground">{college.fees}</p>
                      </div>
                    </div>

                    {/* Campus */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Building2 className="w-4 h-4 text-primary" />
                        <span className="font-medium text-foreground">Campus Environment</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Size: {college.campus.size}</p>
                      {renderRatingBar(college.campus.rating, "bg-primary")}
                    </div>

                    {/* Hostel */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Home className="w-4 h-4 text-secondary" />
                        <span className="font-medium text-foreground">Hostel Facilities</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Availability: {college.hostel.availability}</p>
                      {renderRatingBar(college.hostel.rating, "bg-secondary")}
                    </div>

                    {/* Food */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Utensils className="w-4 h-4 text-accent" />
                        <span className="font-medium text-foreground">Food & Lifestyle</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{college.food.mess}</p>
                      {renderRatingBar(college.food.rating, "bg-accent")}
                    </div>

                    {/* Safety */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-green-500" />
                        <span className="font-medium text-foreground">Safety & Security</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {college.safety.features.map((feature) => (
                          <span key={feature} className="px-2 py-1 rounded-md bg-green-500/10 text-xs text-green-600">
                            {feature}
                          </span>
                        ))}
                      </div>
                      {renderRatingBar(college.safety.score, "bg-green-500")}
                    </div>

                    {/* Placements */}
                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center gap-2 mb-4">
                        <Briefcase className="w-4 h-4 text-primary" />
                        <span className="font-medium text-foreground">Placement Records</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="text-center p-2 rounded-lg bg-primary/10">
                          <p className="text-xs text-muted-foreground">Average</p>
                          <p className="font-bold text-primary">{college.placement.avg}</p>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-secondary/10">
                          <p className="text-xs text-muted-foreground">Highest</p>
                          <p className="font-bold text-secondary">{college.placement.highest}</p>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-accent/10">
                          <p className="text-xs text-muted-foreground">Placed</p>
                          <p className="font-bold text-accent">{college.placement.percentage}</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">Top Recruiters:</p>
                      <div className="flex flex-wrap gap-2">
                        {college.companies.map((company) => (
                          <span key={company} className="px-2 py-1 rounded-md bg-muted text-xs text-foreground">
                            {company}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-12 text-center">
              <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                Select Two Colleges to Compare
              </h3>
              <p className="text-muted-foreground">
                Use the dropdowns above to select colleges and see a detailed comparison.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CollegeComparison;
