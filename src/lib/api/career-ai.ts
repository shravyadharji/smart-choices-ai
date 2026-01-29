import { supabase } from "@/integrations/supabase/client";

export type AIRequestType = 
  | "career_explain" 
  | "career_compare" 
  | "college_compare" 
  | "roadmap" 
  | "eligibility" 
  | "trends";

export interface AIResponse {
  success: boolean;
  content?: string;
  error?: string;
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
