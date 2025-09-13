import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  CheckSquare, 
  Timer, 
  Coffee, 
  BookOpen, 
  TrendingUp 
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Navigation = () => {
  const location = useLocation();
  const { isMobile, isPortrait } = useIsMobile();

  const navItems = [
    { path: "/", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/tasks", icon: CheckSquare, label: "Tasks" },
    { path: "/focus", icon: Timer, label: "Focus" },
    { path: "/breaks", icon: Coffee, label: "Breaks" },
    { path: "/reflection", icon: BookOpen, label: "Reflection" },
    { path: "/insights", icon: TrendingUp, label: "Insights" },
  ];

  // Always show Dashboard
  const visibleItems = isMobile && isPortrait 
    ? navItems.filter(item => item.path === "/") 
    : navItems;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur border-b border-border/50 shadow-calm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* App title */}
          <Link 
            to="/" 
            className="text-2xl font-semibold text-primary hover:text-primary-glow calm-transition"
          >
            MindfulTasks
          </Link>
          
          {/* Navigation items */}
          <div className="flex items-center space-x-8">
            {visibleItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg calm-transition ${
                  location.pathname === path
                    ? "bg-primary text-primary-foreground shadow-focus"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
