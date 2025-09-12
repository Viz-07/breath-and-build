import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TaskProvider } from "@/components/ui/task-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navigation from "./components/Navigation";
import AutoSummaryNotification from "./components/AutoSummaryNotification";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import FocusTimer from "./pages/FocusTimer";
import Breaks from "./pages/Breaks";
import Reflection from "./pages/Reflection";
import Insights from "./pages/Insights";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showAutoSummary, setShowAutoSummary] = useState(true);
  
  // Mock data for auto-summary (in real app, this would come from your state management)
  const mockTasks = [
    { id: 1, title: "Morning meditation", description: "10 minutes of mindful breathing", completed: true, category: "Wellness" },
    { id: 2, title: "Review project proposal", completed: true, category: "Work" },
    { id: 3, title: "Team standup meeting", completed: true, category: "Work" },
  ];

  return (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <TaskProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
                <Navigation />
                {showAutoSummary && (
                <AutoSummaryNotification
                    tasks={mockTasks}
                    focusSessions={3}
                    mindfulMinutes={42}
                    onDismiss={() => setShowAutoSummary(false)}
                />
                )}
                <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/focus" element={<FocusTimer />} />
                <Route path="/breaks" element={<Breaks />} />
                <Route path="/reflection" element={<Reflection />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
            </TaskProvider>
        </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;