import { CheckCircle, Clock, Target, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

const Dashboard = () => {
  const todayTasks = [
    { id: 1, title: "Morning meditation", completed: true, priority: "low" },
    { id: 2, title: "Review project proposal", completed: false, priority: "high" },
    { id: 3, title: "Team standup meeting", completed: true, priority: "medium" },
    { id: 4, title: "Write blog post", completed: false, priority: "medium" },
  ];

  const completedTasks = todayTasks.filter(task => task.completed).length;
  const totalTasks = todayTasks.length;

  return (
    <div className="min-h-screen pt-24 pb-8">
      <div className="container mx-auto px-6">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-semibold text-foreground mb-2">
            Good morning! Ready for a mindful day?
          </h1>
          <p className="text-muted-foreground text-lg">
            Today is {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="focus-card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{completedTasks}/{totalTasks}</p>
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
                <p className="text-2xl font-semibold text-foreground">3</p>
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
                <p className="text-2xl font-semibold text-foreground">7</p>
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
                <p className="text-2xl font-semibold text-foreground">42</p>
                <p className="text-sm text-muted-foreground">Mindful Points</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Today's Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="focus-card">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Today's Tasks</h2>
            <div className="space-y-3">
              {todayTasks.map((task) => (
                <div
                  key={task.id}
                  className={`task-item ${
                    task.completed 
                      ? "opacity-60 bg-success/10 border-success/30" 
                      : "hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      task.completed 
                        ? "bg-success border-success" 
                        : "border-muted-foreground"
                    }`}>
                      {task.completed && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className={`flex-1 ${
                      task.completed ? "line-through text-muted-foreground" : "text-foreground"
                    }`}>
                      {task.title}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      task.priority === "high" 
                        ? "bg-warning/20 text-warning-foreground" 
                        : task.priority === "medium"
                        ? "bg-secondary-accent/20 text-secondary-accent"
                        : "bg-muted text-muted-foreground"
                    }`}>
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