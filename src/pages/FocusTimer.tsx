import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Settings, Coffee, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const FocusTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"focus" | "shortBreak" | "longBreak">("focus");
  const [sessions, setSessions] = useState(0);
  const [showBreakPrompt, setShowBreakPrompt] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const modes = {
    focus: { duration: 25 * 60, label: "Focus Time", color: "primary" },
    shortBreak: { duration: 5 * 60, label: "Short Break", color: "secondary-accent" },
    longBreak: { duration: 15 * 60, label: "Long Break", color: "success" },
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            // Handle session completion
            if (mode === "focus") {
              const newSessions = sessions + 1;
              setSessions(newSessions);
              setShowBreakPrompt(true);
              return modes.focus.duration; // Keep timer ready for next session
            } else {
              setMode("focus");
              return modes.focus.duration;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft, mode, sessions]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(modes[mode].duration);
  };

  const switchMode = (newMode: "focus" | "shortBreak" | "longBreak") => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(modes[newMode].duration);
    setShowBreakPrompt(false);
  };

  const takeBreak = () => {
    navigate("/breaks");
  };

  const skipBreak = () => {
    setShowBreakPrompt(false);
    // Continue with focus session
  };

  const getNextBreakType = () => {
    return sessions % 4 === 0 ? "Long Break (15 min)" : "Short Break (5 min)";
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = ((modes[mode].duration - timeLeft) / modes[mode].duration) * 100;
  const circumference = 2 * Math.PI * 120;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="min-h-screen pt-24 pb-8">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-foreground mb-2">Focus Timer</h1>
          <p className="text-muted-foreground">Stay focused with the Pomodoro technique</p>
        </div>

        {/* Break Prompt Modal */}
        {showBreakPrompt && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
            <Card className="focus-card max-w-md mx-4">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
                  <Coffee className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Focus Session Complete!</h3>
                <p className="text-muted-foreground mb-6">
                  Great work! Time for a {getNextBreakType().toLowerCase()}.
                </p>
                <div className="flex space-x-3">
                  <Button onClick={takeBreak} className="btn-mindful flex-1">
                    <Coffee className="w-4 h-4 mr-2" />
                    Take Break
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={skipBreak}
                    className="flex-1 border-border/50 hover:border-primary/30"
                  >
                    Skip & Continue
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timer */}
          <div className="lg:col-span-2">
            <Card className="focus-card text-center py-12">
              <div className="mb-8">
                <div className="flex justify-center space-x-4 mb-6">
                  {(Object.keys(modes) as Array<keyof typeof modes>).map((modeKey) => (
                    <Button
                      key={modeKey}
                      variant={mode === modeKey ? "default" : "outline"}
                      onClick={() => switchMode(modeKey)}
                      className={mode === modeKey ? "btn-mindful" : "border-border/50 hover:border-primary/30"}
                    >
                      {modes[modeKey].label}
                    </Button>
                  ))}
                </div>

                <div className="relative inline-block mb-8">
                  <svg
                    className="w-80 h-80 -rotate-90"
                    viewBox="0 0 260 260"
                  >
                    {/* Background circle */}
                    <circle
                      cx="130"
                      cy="130"
                      r="120"
                      stroke="hsl(var(--muted))"
                      strokeWidth="8"
                      fill="transparent"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="130"
                      cy="130"
                      r="120"
                      stroke={`hsl(var(--${modes[mode].color}))`}
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      className="transition-all duration-300 ease-linear"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-foreground mb-2">
                        {formatTime(timeLeft)}
                      </div>
                      <div className="text-lg text-muted-foreground">
                        {modes[mode].label}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={toggleTimer}
                    className="btn-mindful px-8 py-3"
                  >
                    {isRunning ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                    {isRunning ? "Pause" : "Start"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={resetTimer}
                    className="border-border/50 hover:border-primary/30 px-6 py-3"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Stats & Settings */}
          <div className="space-y-6">
            <Card className="focus-card">
              <h3 className="text-lg font-medium mb-4 text-foreground">Today's Sessions</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Completed</span>
                  <span className="text-2xl font-semibold text-primary">{sessions}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Focus Time</span>
                  <span className="text-lg font-medium text-foreground">
                    {Math.floor(sessions * 25 / 60)}h {(sessions * 25) % 60}m
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Next Break</span>
                  <span className="text-sm text-secondary-accent">
                    {sessions % 4 === 3 ? "Long Break" : "Short Break"}
                  </span>
                </div>
              </div>
            </Card>

            <Card className="focus-card">
              <h3 className="text-lg font-medium mb-4 text-foreground">Quick Actions</h3>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full border-border/50 hover:border-secondary-accent/30"
                  onClick={() => switchMode("shortBreak")}
                >
                  <Coffee className="w-4 h-4 mr-2" />
                  Take a Break
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-border/50 hover:border-primary/30"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Timer Settings
                </Button>
              </div>
            </Card>

            <Card className="focus-card">
              <h3 className="text-lg font-medium mb-4 text-foreground">Focus Tips</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Remove distractions from your workspace</li>
                <li>• Set a clear intention for each session</li>
                <li>• Take breaks to maintain mental clarity</li>
                <li>• Stay hydrated and breathe deeply</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusTimer;