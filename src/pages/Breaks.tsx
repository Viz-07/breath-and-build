import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Wind, Heart, Sparkles, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Breaks = () => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathCycle, setBreathCycle] = useState<"inhale" | "hold" | "exhale" | "pause">("inhale");
  const [cycleCount, setCycleCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(4);
  
  const breathingPatterns = {
    "4-7-8": { inhale: 4, hold: 7, exhale: 8, pause: 2 },
    "4-4-4": { inhale: 4, hold: 4, exhale: 4, pause: 2 },
    "6-2-6": { inhale: 6, hold: 2, exhale: 6, pause: 2 },
  };
  
  const [selectedPattern, setSelectedPattern] = useState<keyof typeof breathingPatterns>("4-4-4");
  const navigate = useNavigate();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isBreathing) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            const pattern = breathingPatterns[selectedPattern];
            switch (breathCycle) {
              case "inhale":
                setBreathCycle("hold");
                return pattern.hold;
              case "hold":
                setBreathCycle("exhale");
                return pattern.exhale;
              case "exhale":
                setBreathCycle("pause");
                return pattern.pause;
              case "pause":
                setBreathCycle("inhale");
                setCycleCount(c => c + 1);
                return pattern.inhale;
              default:
                return pattern.inhale;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isBreathing, breathCycle, selectedPattern]);

  const startBreathing = () => {
    setIsBreathing(true);
    setBreathCycle("inhale");
    setTimeLeft(breathingPatterns[selectedPattern].inhale);
  };

  const stopBreathing = () => {
    setIsBreathing(false);
  };

  const resetBreathing = () => {
    setIsBreathing(false);
    setBreathCycle("inhale");
    setCycleCount(0);
    setTimeLeft(breathingPatterns[selectedPattern].inhale);
  };

  const getBreathInstruction = () => {
    switch (breathCycle) {
      case "inhale":
        return "Breathe in slowly...";
      case "hold":
        return "Hold your breath...";
      case "exhale":
        return "Breathe out gently...";
      case "pause":
        return "Pause and relax...";
    }
  };

  const getBreathingCircleScale = () => {
    switch (breathCycle) {
      case "inhale":
        return "scale-110";
      case "hold":
        return "scale-110";
      case "exhale":
        return "scale-90";
      case "pause":
        return "scale-100";
    }
  };

  const breakActivities = [
    {
      title: "Mindful Walking",
      description: "Take a gentle 5-minute walk, focusing on each step",
      icon: Wind,
      duration: "5 min",
      color: "primary"
    },
    {
      title: "Gratitude Moment",
      description: "Think of three things you're grateful for today",
      icon: Heart,
      duration: "3 min",
      color: "success"
    },
    {
      title: "Stretch & Move",
      description: "Gentle stretches to release tension",
      icon: Sparkles,
      duration: "5 min",
      color: "secondary-accent"
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-8">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/focus")}
              className="mr-4 hover:bg-primary/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Focus
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-semibold text-foreground mb-2">Mindful Breaks</h1>
              <p className="text-muted-foreground">Restore your energy with guided breathing and activities</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Breathing Exercise */}
          <Card className="focus-card">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-6 text-foreground">Guided Breathing</h2>
              
              {/* Pattern Selection */}
              <div className="flex justify-center space-x-2 mb-8">
                {(Object.keys(breathingPatterns) as Array<keyof typeof breathingPatterns>).map((pattern) => (
                  <Button
                    key={pattern}
                    variant={selectedPattern === pattern ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPattern(pattern)}
                    disabled={isBreathing}
                    className={selectedPattern === pattern 
                      ? "btn-mindful text-xs" 
                      : "border-border/50 hover:border-primary/30 text-xs"
                    }
                  >
                    {pattern}
                  </Button>
                ))}
              </div>

              {/* Breathing Circle */}
              <div className="relative mb-8">
                <div 
                  className={`breathing-circle mx-auto transition-all duration-1000 ease-in-out ${
                    isBreathing ? getBreathingCircleScale() : "scale-100"
                  }`}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">{timeLeft}</div>
                    <div className="text-sm text-white/80">seconds</div>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="mb-6">
                <p className="text-lg text-foreground mb-2">{getBreathInstruction()}</p>
                <p className="text-sm text-muted-foreground">Cycle: {breathCycle}</p>
              </div>

              {/* Controls */}
              <div className="flex justify-center space-x-4 mb-6">
                {!isBreathing ? (
                  <Button onClick={startBreathing} className="btn-mindful">
                    <Play className="w-4 h-4 mr-2" />
                    Start Breathing
                  </Button>
                ) : (
                  <Button onClick={stopBreathing} variant="outline" className="border-border/50 hover:border-destructive/30">
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </Button>
                )}
                <Button 
                  onClick={resetBreathing} 
                  variant="outline"
                  className="border-border/50 hover:border-primary/30"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>

              {/* Stats */}
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  Completed Cycles: <span className="font-medium text-foreground">{cycleCount}</span>
                </p>
              </div>
            </div>
          </Card>

          {/* Break Activities */}
          <Card className="focus-card">
            <h2 className="text-xl font-semibold mb-6 text-foreground">Break Activities</h2>
            
            <div className="space-y-4">
              {breakActivities.map((activity, index) => (
                <div key={index} className="task-item group hover:border-primary/30">
                  <div className="flex items-start space-x-4">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r from-${activity.color} to-${activity.color}-glow flex items-center justify-center flex-shrink-0`}>
                      <activity.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-foreground">{activity.title}</h3>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                          {activity.duration}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {activity.description}
                      </p>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-border/50 hover:border-primary/30 opacity-0 group-hover:opacity-100 calm-transition"
                      >
                        Start Activity
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Tips Section */}
        <Card className="focus-card">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Break Time Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-primary mx-auto mb-3 flex items-center justify-center">
                <Wind className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-medium text-foreground mb-2">Step Away</h3>
              <p className="text-sm text-muted-foreground">
                Leave your workspace to truly disconnect and refresh your mind.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-secondary mx-auto mb-3 flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-medium text-foreground mb-2">Be Present</h3>
              <p className="text-sm text-muted-foreground">
                Focus on the present moment rather than thinking about work tasks.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-focus mx-auto mb-3 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium text-foreground mb-2">Listen to Your Body</h3>
              <p className="text-sm text-muted-foreground">
                Notice tension, fatigue, or stress and choose activities that help.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Breaks;