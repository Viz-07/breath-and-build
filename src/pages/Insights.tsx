import { TrendingUp, Brain, Target, Zap, Calendar, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import OpenAISettings from "@/components/OpenAISettings";

const Insights = () => {
  const weeklyStats = {
    focusSessions: 28,
    tasksCompleted: 42,
    mindfulMinutes: 180,
    streakDays: 7
  };

  const insights = [
    {
      type: "productivity",
      title: "Your Focus Peak Time",
      description: "You're most productive between 9-11 AM with an average of 92% task completion rate during morning focus sessions.",
      icon: Brain,
      color: "primary"
    },
    {
      type: "mindfulness",
      title: "Breathing Exercise Impact",
      description: "Days with breathing exercises show 34% better task completion and improved mood ratings.",
      icon: Zap,
      color: "success"
    },
    {
      type: "patterns",
      title: "Weekly Pattern",
      description: "Tuesday and Thursday are your most productive days. Consider scheduling important tasks then.",
      icon: Target,
      color: "secondary-accent"
    }
  ];

  const aiSummary = `Based on your week's data, you've maintained excellent consistency with 28 focus sessions and 42 completed tasks. Your mindfulness practice has been particularly strong, contributing to sustained energy levels.

Key observations: Your morning focus sessions are 40% more effective than afternoon ones. The combination of Pomodoro technique with breathing breaks has created a powerful productivity rhythm.

For next week: Try scheduling your most challenging tasks during your 9-11 AM peak window, and consider extending your Thursday focus sessions when you typically have the highest completion rates.`;

  const motivationalNudges = [
    "🌟 You've completed 7 days in a row! Your consistency is building powerful habits.",
    "🧘 Your mindfulness practice increased by 25% this week - you're developing deeper awareness.",
    "🎯 Your task completion rate is 15% above average - you're in a great flow state!",
    "⏰ Your focus sessions average 23 minutes - very close to the optimal 25-minute Pomodoro!"
  ];

  return (
    <div className="min-h-screen pt-24 pb-8">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-foreground mb-2">Weekly Insights</h1>
              <p className="text-muted-foreground">AI-powered insights to optimize your mindful productivity</p>
            </div>
            <OpenAISettings />
          </div>
        </div>

        {/* Weekly Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="focus-card text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-primary mx-auto mb-3 flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-foreground">{weeklyStats.focusSessions}</p>
            <p className="text-sm text-muted-foreground">Focus Sessions</p>
          </Card>

          <Card className="focus-card text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-secondary mx-auto mb-3 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-foreground">{weeklyStats.tasksCompleted}</p>
            <p className="text-sm text-muted-foreground">Tasks Completed</p>
          </Card>

          <Card className="focus-card text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-focus mx-auto mb-3 flex items-center justify-center">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">{weeklyStats.mindfulMinutes}</p>
            <p className="text-sm text-muted-foreground">Mindful Minutes</p>
          </Card>

          <Card className="focus-card text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-calm mx-auto mb-3 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">{weeklyStats.streakDays}</p>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AI Summary */}
          <div className="space-y-6">
            <Card className="focus-card">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">AI Weekly Summary</h2>
              </div>
              
              <div className="prose prose-sm text-muted-foreground">
                <p className="leading-relaxed whitespace-pre-line">{aiSummary}</p>
              </div>
              
              <div className="mt-6 p-4 bg-primary/5 border border-primary/10 rounded-lg">
                <p className="text-sm text-primary font-medium mb-2">💡 Pro Tip</p>
                <p className="text-sm text-muted-foreground">
                  Consider using the "Do Not Disturb" mode during your peak focus hours to maximize your natural productivity window.
                </p>
              </div>
            </Card>

            {/* Motivational Nudges */}
            <Card className="focus-card">
              <h2 className="text-xl font-semibold mb-4 text-foreground">Motivational Nudges</h2>
              <div className="space-y-3">
                {motivationalNudges.map((nudge, index) => (
                  <div key={index} className="p-3 bg-success/5 border border-success/10 rounded-lg">
                    <p className="text-sm text-foreground">{nudge}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Insights */}
          <div className="space-y-6">
            <Card className="focus-card">
              <h2 className="text-xl font-semibold mb-6 text-foreground">Key Insights</h2>
              <div className="space-y-4">
                {insights.map((insight, index) => (
                  <div key={index} className="task-item">
                    <div className="flex items-start space-x-4">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-r from-${insight.color} to-${insight.color}-glow flex items-center justify-center flex-shrink-0`}>
                        <insight.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground mb-1">{insight.title}</h3>
                        <p className="text-sm text-muted-foreground">{insight.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Setup Note */}
            <Card className="focus-card border-warning/20 bg-warning/5">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center flex-shrink-0">
                  <Brain className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2">AI Integration Setup</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    To get personalized AI insights and daily summaries, connect your OpenAI API key in settings. This will enable real-time analysis of your productivity patterns and personalized recommendations.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-warning/30 text-warning hover:bg-warning/10"
                  >
                    Setup AI Integration
                  </Button>
                </div>
              </div>
            </Card>

            {/* Progress Chart Placeholder */}
            <Card className="focus-card">
              <h3 className="text-lg font-medium mb-4 text-foreground">Weekly Progress</h3>
              <div className="h-32 bg-muted/30 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Charts and visualizations coming soon
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;