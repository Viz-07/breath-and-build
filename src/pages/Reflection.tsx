import { useState } from "react";
import { Calendar, Save, Edit3, Smile, Meh, Frown, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface JournalEntry {
  id: string;
  date: string;
  mood: "happy" | "neutral" | "sad";
  gratitude: string[];
  reflection: string;
  wins: string[];
  improvements: string;
}

const Reflection = () => {
  const [currentEntry, setCurrentEntry] = useState<JournalEntry>({
    id: "",
    date: new Date().toISOString().split('T')[0],
    mood: "neutral",
    gratitude: ["", "", ""],
    reflection: "",
    wins: [""],
    improvements: ""
  });

  const [savedEntries] = useState<JournalEntry[]>([
    {
      id: "1",
      date: "2024-01-14",
      mood: "happy",
      gratitude: ["Morning coffee", "Team collaboration", "Peaceful evening"],
      reflection: "Today was productive and fulfilling. I felt energized during my focus sessions and made good progress on the project proposal.",
      wins: ["Completed 4 focus sessions", "Finished project outline"],
      improvements: "Could have taken more walking breaks"
    }
  ]);

  const [isEditing, setIsEditing] = useState(true);

  const moodIcons = {
    happy: { icon: Smile, color: "success", label: "Great Day" },
    neutral: { icon: Meh, color: "secondary-accent", label: "Okay Day" },
    sad: { icon: Frown, color: "warning", label: "Tough Day" }
  };

  const updateGratitude = (index: number, value: string) => {
    const newGratitude = [...currentEntry.gratitude];
    newGratitude[index] = value;
    setCurrentEntry({ ...currentEntry, gratitude: newGratitude });
  };

  const updateWin = (index: number, value: string) => {
    const newWins = [...currentEntry.wins];
    newWins[index] = value;
    if (index === newWins.length - 1 && value && newWins.length < 5) {
      newWins.push("");
    }
    setCurrentEntry({ ...currentEntry, wins: newWins });
  };

  const saveEntry = () => {
    // Here you would save to your data store
    console.log("Saving entry:", currentEntry);
    setIsEditing(false);
  };

  const prompts = [
    "What am I most grateful for today?",
    "What did I learn about myself?",
    "How did I grow or challenge myself?",
    "What brought me joy or peace today?",
    "What would I do differently tomorrow?"
  ];

  return (
    <div className="min-h-screen pt-24 pb-8">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-foreground mb-2">Daily Reflection</h1>
            <p className="text-muted-foreground">Take a moment to reflect on your day</p>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Journal Entry */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mood Check-in */}
            <Card className="focus-card">
              <h2 className="text-xl font-semibold mb-4 text-foreground">How was your day?</h2>
              <div className="flex space-x-4">
                {(Object.keys(moodIcons) as Array<keyof typeof moodIcons>).map((mood) => {
                  const { icon: Icon, color, label } = moodIcons[mood];
                  return (
                    <button
                      key={mood}
                      onClick={() => setCurrentEntry({ ...currentEntry, mood })}
                      className={`flex-1 p-4 rounded-lg border-2 calm-transition ${
                        currentEntry.mood === mood
                          ? `border-${color} bg-${color}/10`
                          : "border-border/30 hover:border-primary/30"
                      }`}
                    >
                      <Icon className={`w-8 h-8 mx-auto mb-2 ${
                        currentEntry.mood === mood 
                          ? `text-${color}` 
                          : "text-muted-foreground"
                      }`} />
                      <p className="text-sm font-medium text-foreground">{label}</p>
                    </button>
                  );
                })}
              </div>
            </Card>

            {/* Gratitude */}
            <Card className="focus-card">
              <h2 className="text-xl font-semibold mb-4 text-foreground">Three Things I'm Grateful For</h2>
              <div className="space-y-3">
                {currentEntry.gratitude.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                      {index + 1}
                    </span>
                    <Textarea
                      placeholder="What are you grateful for?"
                      value={item}
                      onChange={(e) => updateGratitude(index, e.target.value)}
                      className="bg-background border-border/50 focus:border-primary resize-none"
                      rows={2}
                    />
                  </div>
                ))}
              </div>
            </Card>

            {/* Daily Wins */}
            <Card className="focus-card">
              <h2 className="text-xl font-semibold mb-4 text-foreground">Today's Wins</h2>
              <div className="space-y-3">
                {currentEntry.wins.map((win, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Star className="w-5 h-5 text-success flex-shrink-0" />
                    <Textarea
                      placeholder="What did you accomplish today?"
                      value={win}
                      onChange={(e) => updateWin(index, e.target.value)}
                      className="bg-background border-border/50 focus:border-primary resize-none"
                      rows={2}
                    />
                  </div>
                ))}
              </div>
            </Card>

            {/* Reflection */}
            <Card className="focus-card">
              <h2 className="text-xl font-semibold mb-4 text-foreground">Daily Reflection</h2>
              <Textarea
                placeholder="How are you feeling? What did you learn? What challenged you today?"
                value={currentEntry.reflection}
                onChange={(e) => setCurrentEntry({ ...currentEntry, reflection: e.target.value })}
                className="bg-background border-border/50 focus:border-primary resize-none min-h-32"
                rows={6}
              />
            </Card>

            {/* Improvements */}
            <Card className="focus-card">
              <h2 className="text-xl font-semibold mb-4 text-foreground">Tomorrow I Will...</h2>
              <Textarea
                placeholder="What would you like to focus on or improve tomorrow?"
                value={currentEntry.improvements}
                onChange={(e) => setCurrentEntry({ ...currentEntry, improvements: e.target.value })}
                className="bg-background border-border/50 focus:border-primary resize-none"
                rows={3}
              />
            </Card>

            {/* Save Button */}
            <div className="flex justify-center">
              <Button onClick={saveEntry} className="btn-mindful px-8 py-3">
                <Save className="w-4 h-4 mr-2" />
                Save Reflection
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Reflection Prompts */}
            <Card className="focus-card">
              <h3 className="text-lg font-medium mb-4 text-foreground">Reflection Prompts</h3>
              <div className="space-y-3">
                {prompts.map((prompt, index) => (
                  <div key={index} className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">{prompt}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Entries */}
            <Card className="focus-card">
              <h3 className="text-lg font-medium mb-4 text-foreground">Recent Entries</h3>
              <div className="space-y-3">
                {savedEntries.map((entry) => {
                  const MoodIcon = moodIcons[entry.mood].icon;
                  return (
                    <div key={entry.id} className="task-item group">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground">
                          {new Date(entry.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                        <MoodIcon className={`w-4 h-4 text-${moodIcons[entry.mood].color}`} />
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {entry.reflection}
                      </p>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="opacity-0 group-hover:opacity-100 calm-transition mt-2"
                      >
                        <Edit3 className="w-3 h-3 mr-1" />
                        View
                      </Button>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reflection;