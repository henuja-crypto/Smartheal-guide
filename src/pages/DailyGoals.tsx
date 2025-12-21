import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useDailyGoals, DailyGoal } from "@/hooks/useLocalStorage";
import { 
  Droplets, 
  Footprints, 
  Moon, 
  Pill, 
  Wind,
  Trophy,
  Flame,
  Plus,
  Minus,
  Check,
  Star,
  Target,
  Zap,
  Bell,
  Clock,
  Dumbbell
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const iconMap: Record<string, React.ReactNode> = {
  water: <Droplets className="w-6 h-6" />,
  steps: <Footprints className="w-6 h-6" />,
  sleep: <Moon className="w-6 h-6" />,
  exercise: <Dumbbell className="w-6 h-6" />,
  breathing: <Wind className="w-6 h-6" />,
  medication: <Pill className="w-6 h-6" />
};

const colorMap: Record<string, string> = {
  water: "from-blue-500 to-cyan-400",
  steps: "from-green-500 to-emerald-400",
  sleep: "from-indigo-500 to-purple-400",
  exercise: "from-orange-500 to-red-400",
  breathing: "from-teal-500 to-primary",
  medication: "from-rose-500 to-pink-400"
};

export default function DailyGoals() {
  const [goalProgress, setGoalProgress] = useDailyGoals();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const goals = goalProgress.goals;
  const streak = goalProgress.streak;

  const updateGoal = (id: string, increment: boolean) => {
    setGoalProgress(prev => {
      const updatedGoals = prev.goals.map(goal => {
        if (goal.id !== id) return goal;
        
        const incrementValue = getIncrement(goal.type);
        let newCurrent = increment 
          ? Math.min(goal.current + incrementValue, goal.target * 2)
          : Math.max(goal.current - incrementValue, 0);
        
        const wasComplete = goal.current >= goal.target;
        const isNowComplete = newCurrent >= goal.target;
        
        if (isNowComplete && !wasComplete) {
          toast({
            title: "Goal Achieved! 🎉",
            description: `You've completed your ${goal.label.toLowerCase()} goal!`
          });
        }
        
        return { ...goal, current: newCurrent };
      });

      // Check if all goals are completed
      const allCompleted = updatedGoals.every(g => g.current >= g.target);
      const prevAllCompleted = prev.goals.every(g => g.current >= g.target);
      
      return {
        ...prev,
        goals: updatedGoals,
        streak: allCompleted && !prevAllCompleted ? prev.streak + 1 : prev.streak
      };
    });
  };

  const getIncrement = (type: string) => {
    switch (type) {
      case "steps": return 1000;
      case "water": return 1;
      case "sleep": return 1;
      case "exercise": return 10;
      case "breathing": return 1;
      case "medication": return 1;
      default: return 1;
    }
  };

  const completedGoals = goals.filter(g => g.current >= g.target).length;
  const totalGoals = goals.length;
  const overallProgress = (completedGoals / totalGoals) * 100;

  const enableNotifications = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        setNotificationsEnabled(true);
        toast({
          title: "Notifications Enabled",
          description: "You'll receive reminders for your health goals"
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent mb-4 shadow-glow">
            <Target className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Daily Goals</h1>
          <p className="text-muted-foreground">Track your daily health habits</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="glass-card border-primary/20">
            <CardContent className="p-4 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-400 mb-2">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-foreground">{streak}</p>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary/20">
            <CardContent className="p-4 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-amber-400 mb-2">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-foreground">{completedGoals}/{totalGoals}</p>
              <p className="text-xs text-muted-foreground">Goals Done</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary/20">
            <CardContent className="p-4 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-violet-400 mb-2">
                <Star className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-foreground">{Math.round(overallProgress)}%</p>
              <p className="text-xs text-muted-foreground">Progress</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary/20">
            <CardContent className="p-4 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent mb-2">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-foreground">{streak * 10}</p>
              <p className="text-xs text-muted-foreground">Health Points</p>
            </CardContent>
          </Card>
        </div>

        {/* Overall Progress */}
        <Card className="glass-card border-primary/20 mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground">Today's Progress</h3>
                <p className="text-sm text-muted-foreground">{completedGoals} of {totalGoals} goals completed</p>
              </div>
              <Badge className={overallProgress === 100 ? "bg-success" : "bg-primary"}>
                {overallProgress === 100 ? "All Done! 🎉" : "In Progress"}
              </Badge>
            </div>
            <Progress value={overallProgress} className="h-4" />
          </CardContent>
        </Card>

        {/* Notifications Toggle */}
        <Card className="glass-card border-primary/20 mb-6">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Daily Reminders</p>
                <p className="text-sm text-muted-foreground">Get notified about your goals</p>
              </div>
            </div>
            <Switch 
              checked={notificationsEnabled} 
              onCheckedChange={enableNotifications}
            />
          </CardContent>
        </Card>

        {/* Goals List */}
        <div className="space-y-4">
          {goals.map((goal) => {
            const progress = Math.min((goal.current / goal.target) * 100, 100);
            const isComplete = goal.current >= goal.target;

            return (
              <Card 
                key={goal.id} 
                className={`glass-card transition-all ${isComplete ? "border-success/30 bg-success/5" : "border-primary/20"}`}
              >
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${colorMap[goal.type]} shadow-lg text-white`}>
                      {iconMap[goal.type]}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-foreground flex items-center gap-2">
                          {goal.label}
                          {isComplete && <Check className="w-4 h-4 text-success" />}
                        </h3>
                        <span className="text-sm font-medium text-muted-foreground">
                          {goal.current} / {goal.target} {goal.unit}
                        </span>
                      </div>
                      <Progress value={progress} className="h-2 mb-2" />
                      <p className="text-xs text-muted-foreground">
                        {isComplete ? "Goal achieved! Great job!" : `${Math.round(progress)}% complete`}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateGoal(goal.id, false)}
                        disabled={goal.current === 0}
                        className="h-10 w-10 rounded-full"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        onClick={() => updateGoal(goal.id, true)}
                        className="h-10 w-10 rounded-full healix-button"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tips Card */}
        <Card className="mt-8 glass-card border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="w-5 h-5 text-accent" />
              Daily Health Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Droplets className="w-4 h-4 text-blue-400 mt-1" />
                <span className="text-sm text-muted-foreground">Drink water first thing in the morning to kickstart your metabolism</span>
              </li>
              <li className="flex items-start gap-3">
                <Footprints className="w-4 h-4 text-green-400 mt-1" />
                <span className="text-sm text-muted-foreground">Take short walks every hour if you have a desk job</span>
              </li>
              <li className="flex items-start gap-3">
                <Wind className="w-4 h-4 text-teal-400 mt-1" />
                <span className="text-sm text-muted-foreground">Practice deep breathing for 5 minutes to reduce stress</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
