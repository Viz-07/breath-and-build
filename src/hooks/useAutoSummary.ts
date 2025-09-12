import { useEffect, useState } from 'react';
import { generateDailySummary, TaskSummaryInput } from '@/lib/openai';

interface UseAutoSummaryProps {
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
  enabled?: boolean;
}

export const useAutoSummary = ({
  tasks,
  reflections,
  focusSessions,
  mindfulMinutes,
  enabled = true
}: UseAutoSummaryProps) => {
  const [summary, setSummary] = useState<{
    summary: string;
    motivationalMessage: string;
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const checkAndGenerateSummary = async () => {
      const now = new Date();
      const isEvening = now.getHours() >= 18; // After 6 PM
      const completedTasks = tasks.filter(task => task.completed);
      
      // Check if we should auto-generate (evening time + tasks completed + no summary today)
      const lastSummaryDate = localStorage.getItem('last_summary_date');
      const today = now.toDateString();
      
      if (isEvening && completedTasks.length > 0 && lastSummaryDate !== today) {
        setIsGenerating(true);
        
        try {
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
          localStorage.setItem('last_summary_date', today);
          
          // Show notification if supported
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Daily Summary Ready', {
              body: 'Your AI-generated daily summary is ready to view!',
              icon: '/favicon.ico'
            });
          }
        } catch (error) {
          console.error('Auto-summary generation failed:', error);
        } finally {
          setIsGenerating(false);
        }
      }
    };

    // Check every 30 minutes
    const interval = setInterval(checkAndGenerateSummary, 30 * 60 * 1000);
    
    // Check immediately
    checkAndGenerateSummary();

    return () => clearInterval(interval);
  }, [tasks, reflections, focusSessions, mindfulMinutes, enabled]);

  // Request notification permission on first load
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return { summary, isGenerating };
};