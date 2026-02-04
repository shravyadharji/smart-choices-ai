import { supabase } from "@/integrations/supabase/client";

export type AIRequestType = 
  | "career_explain" 
  | "career_compare" 
  | "college_compare" 
  | "roadmap" 
  | "eligibility" 
  | "trends"
  | "recommendations";

export interface AIResponse {
  success: boolean;
  content?: string;
  error?: string;
}

export interface CareerRecommendation {
  id: number;
  title: string;
  match: number;
  description: string;
  salary: string;
  growth: string;
  skills: string[];
  companies: string[];
  reasoning: string;
  jobRoles: string[];
}

export interface CollegeRecommendation {
  id: number;
  name: string;
  location: string;
  ranking: string;
  fees: string;
  cutoff: string;
  placement: string;
  forCareers: string[];
  image: string;
}

export interface EntranceExam {
  name: string;
  date: string;
  eligibility: string;
  forColleges: string[];
}

export interface RecommendationsData {
  careers: CareerRecommendation[];
  colleges: CollegeRecommendation[];
  entranceExams: EntranceExam[];
}

export async function getAIInsight(
  type: AIRequestType,
  data: Record<string, unknown>
): Promise<AIResponse> {
  try {
    const { data: response, error } = await supabase.functions.invoke("career-ai", {
      body: { type, data },
    });

    if (error) {
      console.error("AI function error:", error);
      return { success: false, error: error.message };
    }

    return response as AIResponse;
  } catch (err) {
    console.error("AI request failed:", err);
    return { 
      success: false, 
      error: err instanceof Error ? err.message : "Failed to get AI insights" 
    };
  }
}

// Convenience functions for each use case
export async function explainCareer(career: {
  title: string;
  description: string;
  salary: string;
  growth: string;
  skills: string[];
  companies: string[];
}): Promise<AIResponse> {
  return getAIInsight("career_explain", career);
}

export async function compareCarers(
  career1: Record<string, unknown>,
  career2: Record<string, unknown>
): Promise<AIResponse> {
  return getAIInsight("career_compare", { career1, career2 });
}

export async function compareColleges(
  college1: Record<string, unknown>,
  college2: Record<string, unknown>
): Promise<AIResponse> {
  return getAIInsight("college_compare", { college1, college2 });
}

export async function generateRoadmap(
  career: string,
  currentLevel?: string,
  timeline?: string,
  interests?: string[]
): Promise<AIResponse> {
  return getAIInsight("roadmap", { career, currentLevel, timeline, interests });
}

export async function explainEligibility(
  target: string,
  details: Record<string, unknown>,
  background?: string
): Promise<AIResponse> {
  return getAIInsight("eligibility", { target, details, background });
}

export async function analyzeTrends(
  trends: Record<string, unknown>[],
  industry?: string
): Promise<AIResponse> {
  return getAIInsight("trends", { trends, industry });
}

export interface AssessmentData {
  interests: string[];
  skills: string[];
  academicBackground: string;
  locationPreference: string;
  careerGoals: string;
  preferredWorkStyle: string;
  salaryExpectation: string;
}

export async function getPersonalizedRecommendations(
  assessmentData: AssessmentData
): Promise<{ success: boolean; data?: RecommendationsData; error?: string }> {
  try {
    const response = await getAIInsight("recommendations", assessmentData as unknown as Record<string, unknown>);
    
    if (!response.success || !response.content) {
      return { success: false, error: response.error || "Failed to get recommendations" };
    }

    // Parse the JSON response
    try {
      // Clean up the response - remove any markdown code blocks if present
      let content = response.content.trim();
      if (content.startsWith("```json")) {
        content = content.slice(7);
      }
      if (content.startsWith("```")) {
        content = content.slice(3);
      }
      if (content.endsWith("```")) {
        content = content.slice(0, -3);
      }
      content = content.trim();

      // Try to extract JSON if there's extra text
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        content = jsonMatch[0];
      }

      // Try to repair truncated JSON by ensuring arrays and objects are closed
      content = repairTruncatedJson(content);

      const data = JSON.parse(content) as RecommendationsData;
      
      // Validate required fields exist
      if (!data.careers || !Array.isArray(data.careers)) {
        data.careers = [];
      }
      if (!data.colleges || !Array.isArray(data.colleges)) {
        data.colleges = [];
      }
      if (!data.entranceExams || !Array.isArray(data.entranceExams)) {
        data.entranceExams = [];
      }
      
      // Add default images if not provided
      data.colleges = data.colleges.map((college, index) => ({
        ...college,
        image: college.image || getDefaultCollegeImage(index),
      }));

      return { success: true, data };
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError, response.content);
      return { success: false, error: "Failed to parse recommendations. Please try again." };
    }
  } catch (err) {
    console.error("Recommendations request failed:", err);
    return { 
      success: false, 
      error: err instanceof Error ? err.message : "Failed to get recommendations" 
    };
  }
}

function getDefaultCollegeImage(index: number): string {
  const images = [
    "https://images.unsplash.com/photo-1562774053-701939374585?w=400&q=80",
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&q=80",
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80",
    "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&q=80",
  ];
  return images[index % images.length];
}

// Attempt to repair truncated JSON by closing open brackets
function repairTruncatedJson(json: string): string {
  let result = json.trim();
  
  // Count open/close brackets
  let openBraces = 0;
  let openBrackets = 0;
  let inString = false;
  let escapeNext = false;
  
  for (const char of result) {
    if (escapeNext) {
      escapeNext = false;
      continue;
    }
    if (char === '\\') {
      escapeNext = true;
      continue;
    }
    if (char === '"') {
      inString = !inString;
      continue;
    }
    if (inString) continue;
    
    if (char === '{') openBraces++;
    else if (char === '}') openBraces--;
    else if (char === '[') openBrackets++;
    else if (char === ']') openBrackets--;
  }
  
  // If we're in an unclosed string, try to close it
  if (inString) {
    result += '"';
  }
  
  // Remove trailing incomplete values (like incomplete strings or numbers)
  result = result.replace(/,\s*"[^"]*$/, '');
  result = result.replace(/,\s*$/, '');
  
  // Close any open brackets/braces
  while (openBrackets > 0) {
    result += ']';
    openBrackets--;
  }
  while (openBraces > 0) {
    result += '}';
    openBraces--;
  }
  
  return result;
}
