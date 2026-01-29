import { useState, useCallback } from "react";
import { getAIInsight, AIRequestType, AIResponse } from "@/lib/api/career-ai";

interface UseAIInsightReturn {
  content: string | null;
  isLoading: boolean;
  error: string | null;
  fetchInsight: (type: AIRequestType, data: Record<string, unknown>) => Promise<void>;
  reset: () => void;
}

export function useAIInsight(): UseAIInsightReturn {
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInsight = useCallback(
    async (type: AIRequestType, data: Record<string, unknown>) => {
      setIsLoading(true);
      setError(null);
      setContent(null);

      try {
        const response = await getAIInsight(type, data);
        
        if (response.success && response.content) {
          setContent(response.content);
        } else {
          setError(response.error || "Failed to get AI insights");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setContent(null);
    setIsLoading(false);
    setError(null);
  }, []);

  return { content, isLoading, error, fetchInsight, reset };
}
