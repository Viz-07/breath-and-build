import { Bell, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAutoSummary } from '@/hooks/useAutoSummary';

interface AutoSummaryNotificationProps {
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
  onDismiss?: () => void;
}

const AutoSummaryNotification = ({
  tasks,
  reflections,
  focusSessions,
  mindfulMinutes,
  onDismiss
}: AutoSummaryNotificationProps) => {
  const { summary, isGenerating } = useAutoSummary({
    tasks,
    reflections,
    focusSessions,
    mindfulMinutes,
    enabled: true
  });

  if (!summary && !isGenerating) return null;

  return (
    <Card className="fixed bottom-4 right-4 max-w-md z-50 focus-card animate-slide-up shadow-focus">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <Bell className="w-5 h-5 text-primary mr-2" />
          <h4 className="font-medium text-foreground">
            {isGenerating ? 'Generating Summary...' : 'Daily Summary Ready!'}
          </h4>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDismiss}
          className="h-6 w-6 p-0 hover:bg-muted"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {isGenerating ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">
            Creating your personalized daily summary...
          </p>
        </div>
      ) : summary ? (
        <div className="space-y-3">
          <div className="p-3 bg-primary/5 border border-primary/10 rounded-lg">
            <p className="text-sm text-foreground">
              {summary.summary}
            </p>
          </div>
          <div className="p-3 bg-success/5 border border-success/10 rounded-lg">
            <p className="text-sm text-success font-medium">
              {summary.motivationalMessage}
            </p>
          </div>
        </div>
      ) : null}
    </Card>
  );
};

export default AutoSummaryNotification;
