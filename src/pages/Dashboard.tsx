import { CheckCircle, Clock, Target, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useTasks } from "@/components/ui/task-context";
import DailySummaryGenerator from "@/components/DailySummaryGenerator";
import OpenAISettings from "@/components/OpenAISettings";

const Dashboard = () => {
  const { tasks } = useTasks();

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  // Placeholder stats
  const focusSessions = 3;
  const mindfulMinutes = 42;
  const dayStreak = 7;

  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen pt-24 pb-8">
      <div className="container mx-auto px-6">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              Good morning! Ready for a mindful day?
            </h1>
            <p className="text-muted-foreground text-lg">{todayDate}</p>
          </div>
          <OpenAISettings />
        </div>

        {/* AI Daily Summary */}
        <div className="mb-8">
          <DailySummaryGenerator
            tasks={tasks}
            focusSessions={focusSessions}
            mindfulMinutes={mindfulMinutes}
          />
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="focus-card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">
                  {completedTasks}/{totalTasks}
                </p>
                <p className="text-sm text-muted-foreground">Tasks Complete</p>
              </div>
            </div>
          </Card>

          <Card className="focus-card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-secondary flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{focusSessions}</p>
                <p className="text-sm text-muted-foreground">Focus Sessions</p>
              </div>
            </div>
          </Card>

          <Card className="focus-card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-focus flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{dayStreak}</p>
                <p className="text-sm text-muted-foreground">Day Streak</p>
              </div>
            </div>
          </Card>

          <Card className="focus-card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-calm flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{mindfulMinutes}</p>
                <p className="text-sm text-muted-foreground">Mindful Points</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Today's Tasks & Mindful Moment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tasks */}
          <Card className="focus-card">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Today's Tasks</h2>
            <div className="space-y-3">
              {tasks.map(task => (
                <div
                  key={task.id}
                  className={`task-item ${
                    task.completed
                      ? "opacity-60 bg-success/10 border-success/30"
                      : "hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        task.completed
                          ? "bg-success border-success"
                          : "border-muted-foreground"
                      }`}
                    >
                      {task.completed && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                    <span
                      className={`flex-1 ${
                        task.completed ? "line-through text-muted-foreground" : "text-foreground"
                      }`}
                    >
                      {task.title}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        task.priority === "high"
                          ? "bg-warning/20 text-warning-foreground"
                          : task.priority === "medium"
                          ? "bg-secondary-accent/20 text-secondary-accent"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Mindful Moment */}
          <Card className="focus-card">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Mindful Moment</h2>
            <div className="text-center py-8">
              <div className="breathing-circle mx-auto mb-4"></div>
              <p className="text-muted-foreground mb-4">
                "The present moment is the only time over which we have dominion."
              </p>
              <p className="text-sm text-muted-foreground">- Thích Nhất Hạnh</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
