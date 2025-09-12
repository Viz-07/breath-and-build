import { useState } from "react";
import { Plus, Star, Calendar, MoreVertical } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  category: string;
  dueDate?: string;
}

interface Habit {
  id: number;
  name: string;
  streak: number;
  completedToday: boolean;
  target: number;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { 
      id: 1, 
      title: "Morning meditation", 
      description: "10 minutes of mindful breathing",
      completed: true, 
      priority: "high",
      category: "Wellness",
      dueDate: "2024-01-15"
    },
    { 
      id: 2, 
      title: "Review project proposal", 
      completed: false, 
      priority: "high",
      category: "Work"
    },
    { 
      id: 3, 
      title: "Team standup meeting", 
      completed: true, 
      priority: "medium",
      category: "Work"
    },
  ]);

  const [habits, setHabits] = useState<Habit[]>([
    { id: 1, name: "Meditation", streak: 7, completedToday: true, target: 10 },
    { id: 2, name: "Gratitude Journal", streak: 3, completedToday: false, target: 5 },
    { id: 3, name: "Deep Work Session", streak: 5, completedToday: true, target: 2 },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleHabit = (id: number) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, completedToday: !habit.completedToday } : habit
    ));
  };

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now(),
        title: newTaskTitle,
        completed: false,
        priority: "medium",
        category: "Personal"
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
      setShowAddTask(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-8">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-foreground mb-2">Tasks & Habits</h1>
            <p className="text-muted-foreground">Organize your day with intention</p>
          </div>
          <Button 
            onClick={() => setShowAddTask(!showAddTask)}
            className="btn-mindful"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tasks Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Add Task Form */}
            {showAddTask && (
              <Card className="focus-card animate-slide-up">
                <h3 className="text-lg font-medium mb-4">Add New Task</h3>
                <div className="space-y-4">
                  <Input
                    placeholder="Task title..."
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="bg-background border-border/50 focus:border-primary"
                  />
                  <div className="flex space-x-2">
                    <Button onClick={addTask} className="btn-mindful flex-1">
                      Add Task
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowAddTask(false)}
                      className="border-border/50 hover:border-primary/30"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Tasks List */}
            <Card className="focus-card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Today's Tasks</h2>
                <span className="text-sm text-muted-foreground">
                  {tasks.filter(t => t.completed).length} of {tasks.length} completed
                </span>
              </div>
              
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`task-item group ${
                      task.completed 
                        ? "opacity-60 bg-success/5 border-success/20" 
                        : ""
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`w-5 h-5 rounded-full border-2 mt-1 flex items-center justify-center calm-transition ${
                          task.completed 
                            ? "bg-success border-success" 
                            : "border-muted-foreground hover:border-primary"
                        }`}
                      >
                        {task.completed && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </button>
                      
                      <div className="flex-1">
                        <h4 className={`font-medium ${
                          task.completed 
                            ? "line-through text-muted-foreground" 
                            : "text-foreground"
                        }`}>
                          {task.title}
                        </h4>
                        {task.description && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {task.description}
                          </p>
                        )}
                        <div className="flex items-center space-x-4 mt-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            task.priority === "high" 
                              ? "bg-warning/20 text-warning-foreground" 
                              : task.priority === "medium"
                              ? "bg-secondary-accent/20 text-secondary-accent"
                              : "bg-muted text-muted-foreground"
                          }`}>
                            {task.priority}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {task.category}
                          </span>
                        </div>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 calm-transition"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Habits Section */}
          <div>
            <Card className="focus-card">
              <h2 className="text-xl font-semibold mb-6 text-foreground">Daily Habits</h2>
              
              <div className="space-y-4">
                {habits.map((habit) => (
                  <div key={habit.id} className="task-item">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => toggleHabit(habit.id)}
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center calm-transition ${
                            habit.completedToday 
                              ? "bg-primary border-primary" 
                              : "border-muted-foreground hover:border-primary"
                          }`}
                        >
                          {habit.completedToday && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </button>
                        <span className="font-medium text-foreground">{habit.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-warning fill-current" />
                        <span className="text-sm font-medium text-foreground">{habit.streak}</span>
                      </div>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(habit.streak / habit.target) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {habit.streak} / {habit.target} days
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;