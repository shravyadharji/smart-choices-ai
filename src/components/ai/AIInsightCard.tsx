import { useState } from "react";
import { Sparkles, Loader2, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AIInsightCardProps {
  title?: string;
  content: string | null;
  isLoading: boolean;
  error?: string | null;
  onRefresh?: () => void;
  className?: string;
}

export const AIInsightCard = ({
  title = "AI Insights",
  content,
  isLoading,
  error,
  onRefresh,
  className,
}: AIInsightCardProps) => {
  if (!content && !isLoading && !error) {
    return null;
  }

  return (
    <div
      className={cn(
        "glass-card rounded-2xl p-6 border border-secondary/20",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-secondary/10">
            <Sparkles className="w-5 h-5 text-secondary" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground">
            {title}
          </h3>
        </div>
        {onRefresh && !isLoading && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onRefresh}
            className="text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        )}
      </div>

      {isLoading && (
        <div className="flex items-center gap-3 py-8">
          <Loader2 className="w-5 h-5 text-secondary animate-spin" />
          <span className="text-muted-foreground">Analyzing with AI...</span>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-3 py-4 px-4 rounded-lg bg-destructive/10 border border-destructive/20">
          <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-destructive font-medium">Unable to generate insights</p>
            <p className="text-sm text-muted-foreground mt-1">{error}</p>
          </div>
        </div>
      )}

      {content && !isLoading && (
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <div className="text-foreground whitespace-pre-wrap leading-relaxed">
            {content.split("\n").map((paragraph, index) => {
              // Handle markdown-style headers
              if (paragraph.startsWith("### ")) {
                return (
                  <h4 key={index} className="font-semibold text-foreground mt-4 mb-2">
                    {paragraph.replace("### ", "")}
                  </h4>
                );
              }
              if (paragraph.startsWith("## ")) {
                return (
                  <h3 key={index} className="font-bold text-foreground mt-4 mb-2">
                    {paragraph.replace("## ", "")}
                  </h3>
                );
              }
              if (paragraph.startsWith("# ")) {
                return (
                  <h2 key={index} className="font-bold text-lg text-foreground mt-4 mb-2">
                    {paragraph.replace("# ", "")}
                  </h2>
                );
              }
              // Handle bullet points
              if (paragraph.startsWith("- ") || paragraph.startsWith("* ")) {
                return (
                  <li key={index} className="text-muted-foreground ml-4">
                    {paragraph.replace(/^[-*] /, "")}
                  </li>
                );
              }
              // Handle numbered lists
              if (/^\d+\. /.test(paragraph)) {
                return (
                  <li key={index} className="text-muted-foreground ml-4 list-decimal">
                    {paragraph.replace(/^\d+\. /, "")}
                  </li>
                );
              }
              // Handle bold text
              if (paragraph.includes("**")) {
                const parts = paragraph.split(/\*\*(.*?)\*\*/g);
                return (
                  <p key={index} className="text-muted-foreground mb-2">
                    {parts.map((part, i) =>
                      i % 2 === 1 ? (
                        <strong key={i} className="text-foreground font-semibold">
                          {part}
                        </strong>
                      ) : (
                        part
                      )
                    )}
                  </p>
                );
              }
              // Regular paragraph
              if (paragraph.trim()) {
                return (
                  <p key={index} className="text-muted-foreground mb-2">
                    {paragraph}
                  </p>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};
