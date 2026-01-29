import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

type RequestBody = {
  type: "career_explain" | "career_compare" | "college_compare" | "roadmap" | "eligibility" | "trends";
  data: Record<string, unknown>;
};

const systemPrompts: Record<string, string> = {
  career_explain: `You are an expert career counselor for Indian students. Your role is to explain career options clearly and helpfully.

IMPORTANT GUIDELINES:
- Only analyze and explain the career data provided to you - do not invent statistics or facts
- Be encouraging but realistic about career prospects
- Consider the Indian job market context
- Highlight growth potential, required skills, and day-to-day work
- Keep responses concise but informative (under 300 words)
- Use simple language suitable for students`,

  career_compare: `You are an expert career counselor helping students compare career options.

IMPORTANT GUIDELINES:
- Only compare based on the data provided - do not fabricate statistics
- Present a balanced view showing pros and cons of each career
- Consider Indian market context for salaries and opportunities
- Help students understand which career might suit different personalities
- Structure your response clearly with headings
- Keep it under 400 words`,

  college_compare: `You are an expert education counselor helping students compare colleges in India.

IMPORTANT GUIDELINES:
- Only analyze the college data provided to you
- Consider factors like placements, campus life, faculty, location, fees
- Be objective and balanced in comparisons
- Mention what type of student each college might suit best
- Keep response under 400 words`,

  roadmap: `You are a career mentor helping students plan their skill development journey.

IMPORTANT GUIDELINES:
- Create actionable, realistic learning roadmaps
- Consider the student's current level and target career
- Recommend specific resources (courses, projects, certifications)
- Break down the journey into manageable phases
- Include both technical and soft skills
- Keep it practical for Indian students`,

  eligibility: `You are an expert in Indian college admissions and entrance exams.

IMPORTANT GUIDELINES:
- Explain eligibility criteria clearly and accurately
- Only use the exam/college data provided
- Clarify common misconceptions
- Provide actionable preparation tips
- Be encouraging while being realistic about cutoffs`,

  trends: `You are a job market analyst specializing in the Indian employment landscape.

IMPORTANT GUIDELINES:
- Analyze the market trend data provided objectively
- Explain what trends mean for students and job seekers
- Highlight emerging opportunities
- Be realistic about market conditions
- Provide actionable insights`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("AI service is not configured");
    }

    const { type, data } = (await req.json()) as RequestBody;
    
    if (!type || !systemPrompts[type]) {
      throw new Error("Invalid request type");
    }

    const systemPrompt = systemPrompts[type];
    const userMessage = buildUserMessage(type, data);

    console.log(`Processing ${type} request`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        stream: false,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI service credits exhausted. Please contact support." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error("AI service temporarily unavailable");
    }

    const result = await response.json();
    const content = result.choices?.[0]?.message?.content || "Unable to generate response";

    console.log(`Successfully processed ${type} request`);

    return new Response(
      JSON.stringify({ success: true, content }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Career AI error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function buildUserMessage(type: string, data: Record<string, unknown>): string {
  switch (type) {
    case "career_explain":
      return `Please explain this career option to a student:

Career: ${data.title}
Description: ${data.description}
Salary Range: ${data.salary}
Growth Outlook: ${data.growth}
Key Skills Required: ${JSON.stringify(data.skills)}
Top Companies Hiring: ${JSON.stringify(data.companies)}

Provide a comprehensive explanation including:
1. What this career involves day-to-day
2. Why it's a good choice in today's market
3. What skills and preparation are needed
4. Career progression path`;

    case "career_compare":
      return `Compare these two careers for a student trying to decide:

Career 1: ${JSON.stringify(data.career1)}
Career 2: ${JSON.stringify(data.career2)}

Please compare:
1. Job roles and daily work
2. Salary and growth potential
3. Work-life balance
4. Required skills and education
5. Future job market outlook
6. Which personality types suit each career`;

    case "college_compare":
      return `Compare these colleges for a prospective student:

College 1: ${JSON.stringify(data.college1)}
College 2: ${JSON.stringify(data.college2)}

Please compare:
1. Academic reputation and ranking
2. Campus facilities and environment
3. Placement records and top recruiters
4. Fee structure and ROI
5. Location and accessibility
6. Best suited for what type of student`;

    case "roadmap":
      return `Create a skill development roadmap for:

Target Career: ${data.career}
Current Education Level: ${data.currentLevel || "12th Grade/Undergraduate"}
Timeline: ${data.timeline || "4 years"}
Student's Interests: ${JSON.stringify(data.interests) || "Not specified"}

Please provide:
1. Phase-wise skill development plan
2. Recommended courses and certifications
3. Projects to build
4. Internship and experience suggestions
5. Soft skills to develop`;

    case "eligibility":
      return `Explain the eligibility and admission process:

Target: ${data.target}
Exam/College Details: ${JSON.stringify(data.details)}
Student's Background: ${data.background || "12th Science/PCM"}

Please explain:
1. Eligibility criteria in simple terms
2. Key exam details and dates
3. Preparation strategy
4. Common mistakes to avoid
5. Backup options`;

    case "trends":
      return `Analyze these job market trends:

Trend Data: ${JSON.stringify(data.trends)}
Industry Focus: ${data.industry || "Technology"}

Please provide:
1. Key insights from the data
2. Emerging opportunities
3. Skills becoming more valuable
4. Advice for students entering this field
5. 5-year outlook`;

    default:
      return JSON.stringify(data);
  }
}
