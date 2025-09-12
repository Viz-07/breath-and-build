import { useState } from "react";
import { Sparkles, Loader2, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { generateDailySummary, TaskSummaryInput } from "@/lib/openai";
import { useToast } from "@/hooks/use-toast";

interface DailySummaryGeneratorProps {
  tasks: Array<{
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    category: string;
  }>;
  reflections?: {
    mood: "happy" | "neutral" | "sad";
    gratitude: string[];
    reflection: string;
    wins: string[];
    improvements: string;
  };
  focusSessions: number;
  mindfulMinutes: number;
}

const DailySummaryGenerator = ({ 
  tasks, 
  reflections, 
  focusSessions, 
  mindfulMinutes 
}: DailySummaryGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [summary, setSummary] = useState<{
    summary: string;
    motivationalMessage: string;
  } | null>(null);
  const { toast } = useToast();

  const handleGenerateSummary = async () => {
    setIsGenerating(true);
    
    try {
      const completedTasks = tasks.filter(task => task.completed);
      
      const input: TaskSummaryInput = {
        completedTasks: completedTasks.map(task => ({
          title: task.title,
          description: task.description,
          category: task.category
        })),
        reflections: reflections ? {
          mood: reflections.mood === "happy" ? "Great" : reflections.mood === "neutral" ? "Okay" : "Challenging",
          gratitude: reflections.gratitude,
          reflection: reflections.reflection,
          wins: reflections.wins,
          improvements: reflections.improvements
        } : undefined,
        focusSessions,
        mindfulMinutes
      };

      const result = await generateDailySummary(input);
      setSummary(result);
      
      toast({
        title: "Summary Generated",
        description: "Your daily summary is ready!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate summary",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const completedTasksCount = tasks.filter(task => task.completed).length;

  return (
    <Card className="focus-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-foreground flex items-center">
          <MessageSquare className="w-5 h-5 mr-2" />
          AI Daily Summary
        </h3>
        <Button
          onClick={handleGenerateSummary}
          disabled={isGenerating || completedTasksCount === 0}
          className="btn-mindful"
        >
          {isGenerating ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4 mr-2" />
          )}
          {isGenerating ? "Generating..." : "Generate Summary"}
        </Button>
      </div>

      {completedTasksCount === 0 && (
        <p className="text-sm text-muted-foreground mb-4">
          Complete some tasks to generate your daily summary.
        </p>
      )}

      {summary && (
        <div className="space-y-4 animate-fade-in">
          <div className="p-4 bg-primary/5 border border-primary/10 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">Daily Summary</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {summary.summary}
            </p>
          </div>
          
          <div className="p-4 bg-success/5 border border-success/10 rounded-lg">
            <h4 className="font-medium text-foreground mb-2 flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-success" />
              Motivational Message
            </h4>
            <p className="text-sm text-success font-medium">
              {summary.motivationalMessage}
            </p>
          </div>
        </div>
      )}

      <div className="mt-4 text-xs text-muted-foreground">
        Today: {completedTasksCount} tasks completed • {focusSessions} focus sessions • {mindfulMinutes} mindful minutes
      </div>
    </Card>
  );
};

export default DailySummaryGenerator;