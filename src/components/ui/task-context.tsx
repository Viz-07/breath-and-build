import { createContext, useContext, useState, ReactNode } from "react";

export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  category: string;
  dueDate?: string;
}

export interface Habit {
  id: number;
  name: string;
  streak: number;
  completedToday: boolean;
  target: number;
}

interface TaskContextValue {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  toggleTask: (id: number) => void;
  habits: Habit[];
  setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
  toggleHabit: (id: number) => void;
}

const TaskContext = createContext<TaskContextValue | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Morning meditation", completed: true, priority: "high", category: "Wellness" },
    { id: 2, title: "Review project proposal", completed: false, priority: "high", category: "Work" },
    { id: 3, title: "Team standup meeting", completed: true, priority: "medium", category: "Work" },
    { id: 4, title: "Write blog post", completed: false, priority: "medium", category: "Personal" },
  ]);

  const [habits, setHabits] = useState<Habit[]>([
    { id: 1, name: "Meditation", streak: 7, completedToday: true, target: 10 },
    { id: 2, name: "Gratitude Journal", streak: 3, completedToday: false, target: 5 },
    { id: 3, name: "Deep Work Session", streak: 5, completedToday: true, target: 2 },
  ]);

  const toggleTask = (id: number) => {
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  };

  const toggleHabit = (id: number) => {
    setHabits(prev =>
      prev.map(habit =>
        habit.id === id ? { ...habit, completedToday: !habit.completedToday } : habit
      )
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, setTasks, toggleTask, habits, setHabits, toggleHabit }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};
