"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { generateFocusPrompt } from "@/ai/flows/generate-focus-prompt";
import { Sparkles, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function AIFocusPrompt() {
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const result = await generateFocusPrompt({ context: "The user is looking to be productive and needs a mental push." });
      setSuggestion(result.suggestion);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <Button 
        onClick={handleGenerate} 
        disabled={isLoading}
        variant="ghost" 
        className="w-full h-auto py-3 group hover:bg-secondary/20 transition-all border border-dashed border-primary/30"
      >
        <div className="flex items-center justify-center gap-2 text-primary font-medium">
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          <span>Get Focus Inspiration</span>
        </div>
      </Button>

      {suggestion && (
        <Card className="mt-4 border-primary/20 bg-primary/5 animate-in fade-in slide-in-from-top-4">
          <CardContent className="pt-6">
            <p className="text-sm text-center italic text-foreground leading-relaxed">
              "{suggestion}"
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
