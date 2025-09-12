import { useState } from "react";
import { Plus, Star, Calendar, MoreVertical, Edit, Trash2, CalendarIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

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
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState<Date>();
  const [showAddTask, setShowAddTask] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

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
        description: newTaskDescription.trim() || undefined,
        completed: false,
        priority: "medium",
        category: "Personal",
        dueDate: newTaskDueDate ? format(newTaskDueDate, "yyyy-MM-dd") : undefined
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
      setNewTaskDescription("");
      setNewTaskDueDate(undefined);
      setShowAddTask(false);
    }
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEditTask = (task: Task) => {
    setEditingTask(task);
    setNewTaskTitle(task.title);
    setNewTaskDescription(task.description || "");
    setNewTaskDueDate(task.dueDate ? new Date(task.dueDate) : undefined);
    setShowAddTask(true);
  };

  const updateTask = () => {
    if (editingTask && newTaskTitle.trim()) {
      const updatedTask: Task = {
        ...editingTask,
        title: newTaskTitle,
        description: newTaskDescription.trim() || undefined,
        dueDate: newTaskDueDate ? format(newTaskDueDate, "yyyy-MM-dd") : undefined
      };
      setTasks(tasks.map(task => task.id === editingTask.id ? updatedTask : task));
      setEditingTask(null);
      setNewTaskTitle("");
      setNewTaskDescription("");
      setNewTaskDueDate(undefined);
      setShowAddTask(false);
    }
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setNewTaskTitle("");
    setNewTaskDescription("");
    setNewTaskDueDate(undefined);
    setShowAddTask(false);
  };

  const getTaskPriorityByDate = (task: Task) => {
    if (!task.dueDate) return task.priority;
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "high"; // Overdue
    if (diffDays === 0) return "high"; // Due today
    if (diffDays === 1) return "medium"; // Due tomorrow
    return task.priority;
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    // Completed tasks go to bottom
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Sort by due date (overdue first)
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    if (a.dueDate && !b.dueDate) return -1;
    if (!a.dueDate && b.dueDate) return 1;
    
    return 0;
  });

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
            {/* Add/Edit Task Form */}
            {showAddTask && (
              <Card className="focus-card animate-slide-up">
                <h3 className="text-lg font-medium mb-4">
                  {editingTask ? "Edit Task" : "Add New Task"}
                </h3>
                <div className="space-y-4">
                  <Input
                    placeholder="Task title..."
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="bg-background border-border/50 focus:border-primary"
                  />
                  <Textarea
                    placeholder="Task description (optional)..."
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    className="bg-background border-border/50 focus:border-primary"
                    rows={2}
                  />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal border-border/50 hover:border-primary/30",
                          !newTaskDueDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newTaskDueDate ? format(newTaskDueDate, "PPP") : <span>Set due date (optional)</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={newTaskDueDate}
                        onSelect={setNewTaskDueDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <div className="flex space-x-2">
                    <Button 
                      onClick={editingTask ? updateTask : addTask} 
                      className="btn-mindful flex-1"
                    >
                      {editingTask ? "Update Task" : "Add Task"}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={cancelEdit}
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
                {sortedTasks.map((task) => {
                  const effectivePriority = getTaskPriorityByDate(task);
                  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
                  const isDueToday = task.dueDate && format(new Date(task.dueDate), "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
                  
                   return (
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
                              effectivePriority === "high" 
                                ? isOverdue ? "bg-destructive/20 text-destructive" : "bg-warning/20 text-warning-foreground" 
                                : effectivePriority === "medium"
                                ? "bg-secondary-accent/20 text-secondary-accent"
                                : "bg-muted text-muted-foreground"
                            }`}>
                              {isOverdue ? "Overdue" : isDueToday ? "Due Today" : task.priority}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {task.category}
                            </span>
                            {task.dueDate && (
                              <span className={`text-xs flex items-center ${
                                isOverdue ? "text-destructive" : isDueToday ? "text-warning-foreground" : "text-muted-foreground"
                              }`}>
                                <Calendar className="w-3 h-3 mr-1" />
                                {format(new Date(task.dueDate), "MMM d")}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 calm-transition">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => startEditTask(task)}
                            className="hover:bg-primary/10"
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => deleteTask(task.id)}
                            className="hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
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