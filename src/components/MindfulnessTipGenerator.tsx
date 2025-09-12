import { useState } from "react";
import { Lightbulb, Loader2, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { generateMindfulnessTip } from "@/lib/openai";
import { useToast } from "@/hooks/use-toast";

const MindfulnessTipGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [tip, setTip] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerateTip = async () => {
    setIsGenerating(true);
    
    try {
      const newTip = await generateMindfulnessTip();
      setTip(newTip);
      
      toast({
        title: "New Mindfulness Tip",
        description: "A fresh tip has been generated for you!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate tip",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="focus-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-foreground flex items-center">
          <Lightbulb className="w-5 h-5 mr-2" />
          AI Mindfulness Tip
        </h3>
        <Button
          onClick={handleGenerateTip}
          disabled={isGenerating}
          variant="outline"
          size="sm"
          className="border-border/50 hover:border-primary/30"
        >
          {isGenerating ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4 mr-2" />
          )}
          {isGenerating ? "Generating..." : "Get New Tip"}
        </Button>
      </div>

      {tip ? (
        <div className="p-4 bg-secondary-accent/5 border border-secondary-accent/10 rounded-lg animate-fade-in">
          <p className="text-sm text-foreground leading-relaxed">
            {tip}
          </p>
        </div>
      ) : (
        <div className="p-4 bg-muted/30 rounded-lg text-center">
          <p className="text-sm text-muted-foreground">
            Click "Get New Tip" to receive a personalized mindfulness tip for your break.
          </p>
        </div>
      )}
    </Card>
  );
};

export default MindfulnessTipGenerator;