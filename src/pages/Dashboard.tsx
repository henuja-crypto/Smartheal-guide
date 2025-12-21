import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useHealthProfile, useSymptomHistory, useDailyGoals } from "@/hooks/useLocalStorage";
import { 
  Stethoscope, 
  Activity, 
  Target,
  MapPin,
  ChevronRight,
  Sparkles,
  Clock,
  TrendingUp,
  Droplets,
  Footprints,
  Moon,
  BookOpen,
  UserCircle,
  Flame
} from "lucide-react";
import doctorImage from "@/assets/doctor-anime.png";

export default function Dashboard() {
  const navigate = useNavigate();
  const [profile] = useHealthProfile();
  const [symptomHistory] = useSymptomHistory();
  const [goalProgress] = useDailyGoals();

  const goals = goalProgress.goals;
  const streak = goalProgress.streak;
  const completedGoals = goals.filter(g => g.current >= g.target).length;
  const totalGoals = goals.length;
  const goalsProgress = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;

  const quickActions = [
    { title: "Symptom Checker", description: "AI-powered analysis", icon: Stethoscope, path: "/symptom-checker", gradient: "from-primary to-accent" },
    { title: "Health Library", description: "Explore conditions", icon: BookOpen, path: "/library", gradient: "from-secondary to-primary" },
    { title: "Daily Goals", description: "Track your habits", icon: Target, path: "/goals", gradient: "from-accent to-green-500" },
    { title: "Find Care", description: "Nearby facilities", icon: MapPin, path: "/nearby", gradient: "from-destructive to-warning" }
  ];

  const waterGoal = goals.find(g => g.type === "water");
  const stepsGoal = goals.find(g => g.type === "steps");
  const sleepGoal = goals.find(g => g.type === "sleep");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="relative mb-8 animate-fade-in">
          <div className="glass-card rounded-3xl p-6 md:p-8 overflow-hidden border border-primary/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-3xl" />
            <div className="relative flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-primary/10 text-primary border-primary/20"><Sparkles className="w-3 h-3 mr-1" />Welcome Back</Badge>
                  {streak > 0 && <Badge className="bg-warning/10 text-warning border-warning/20"><Flame className="w-3 h-3 mr-1" />{streak} Day Streak</Badge>}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Hello, {profile?.name || "Health Explorer"}! 👋</h1>
                <p className="text-muted-foreground text-lg mb-4">Your daily health companion is ready to assist you.</p>
                {!profile?.isProfileComplete && (
                  <Button onClick={() => navigate("/profile")} className="healix-button gap-2"><UserCircle className="w-4 h-4" />Complete Your Profile</Button>
                )}
              </div>
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 p-2 shadow-glow flex items-center justify-center">
                <img 
                  src={doctorImage} 
                  alt="Your health companion" 
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="glass-card border-primary/20"><CardContent className="p-4 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 mb-2"><Droplets className="w-6 h-6 text-white" /></div>
            <p className="text-2xl font-bold text-foreground">{waterGoal?.current || 0}</p><p className="text-xs text-muted-foreground">Glasses Today</p>
          </CardContent></Card>
          <Card className="glass-card border-primary/20"><CardContent className="p-4 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 mb-2"><Footprints className="w-6 h-6 text-white" /></div>
            <p className="text-2xl font-bold text-foreground">{((stepsGoal?.current || 0) / 1000).toFixed(1)}k</p><p className="text-xs text-muted-foreground">Steps Today</p>
          </CardContent></Card>
          <Card className="glass-card border-primary/20"><CardContent className="p-4 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-400 mb-2"><Moon className="w-6 h-6 text-white" /></div>
            <p className="text-2xl font-bold text-foreground">{sleepGoal?.current || 0}h</p><p className="text-xs text-muted-foreground">Sleep Hours</p>
          </CardContent></Card>
          <Card className="glass-card border-primary/20"><CardContent className="p-4 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-400 mb-2"><Flame className="w-6 h-6 text-white" /></div>
            <p className="text-2xl font-bold text-foreground">{streak}</p><p className="text-xs text-muted-foreground">Day Streak</p>
          </CardContent></Card>
        </div>

        {/* Quick Actions */}
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Activity className="w-5 h-5 text-primary" />Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action) => (
            <Card key={action.title} className="glass-card border-primary/10 hover:border-primary/30 cursor-pointer transition-all group hover:scale-[1.02]" onClick={() => navigate(action.path)}>
              <CardContent className="p-5">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} mb-4 shadow-lg`}><action.icon className="w-6 h-6 text-white" /></div>
                <h3 className="font-semibold text-foreground mb-1">{action.title}</h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
                <ChevronRight className="w-5 h-5 text-primary mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Goals & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="glass-card border-primary/20">
            <CardHeader className="pb-2"><CardTitle className="flex items-center justify-between"><span className="flex items-center gap-2"><Target className="w-5 h-5 text-primary" />Daily Goals</span><Button variant="ghost" size="sm" onClick={() => navigate("/goals")}>View All <ChevronRight className="w-4 h-4 ml-1" /></Button></CardTitle></CardHeader>
            <CardContent>
              <div className="mb-4"><div className="flex justify-between text-sm mb-2"><span className="text-muted-foreground">{completedGoals} of {totalGoals} completed</span><span className="font-medium text-primary">{Math.round(goalsProgress)}%</span></div><Progress value={goalsProgress} className="h-3" /></div>
              <div className="space-y-3">{goals.slice(0, 3).map((goal) => (<div key={goal.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50"><span className="text-sm text-foreground">{goal.label}</span><Badge variant={goal.current >= goal.target ? "default" : "outline"}>{goal.current}/{goal.target} {goal.unit}</Badge></div>))}</div>
            </CardContent>
          </Card>
          <Card className="glass-card border-primary/20">
            <CardHeader className="pb-2"><CardTitle className="flex items-center justify-between"><span className="flex items-center gap-2"><Clock className="w-5 h-5 text-accent" />Recent Checks</span><Button variant="ghost" size="sm" onClick={() => navigate("/symptom-checker")}>New Check <ChevronRight className="w-4 h-4 ml-1" /></Button></CardTitle></CardHeader>
            <CardContent>{symptomHistory.length > 0 ? (<div className="space-y-3">{symptomHistory.slice(0, 3).map((entry) => (<div key={entry.id} className="p-3 rounded-lg bg-muted/50"><div className="flex justify-between items-start mb-2"><span className="text-xs text-muted-foreground">{new Date(entry.date).toLocaleDateString()}</span><Badge variant="outline" className="text-xs">{entry.results.length} match(es)</Badge></div><div className="flex flex-wrap gap-1">{entry.symptoms.slice(0, 3).map((s, i) => (<Badge key={i} variant="secondary" className="text-xs">{s}</Badge>))}</div></div>))}</div>) : (<div className="text-center py-8"><Stethoscope className="w-12 h-12 text-muted-foreground mx-auto mb-3" /><p className="text-muted-foreground">No symptom checks yet</p><Button variant="link" className="text-primary" onClick={() => navigate("/symptom-checker")}>Start your first check</Button></div>)}</CardContent>
          </Card>
        </div>

        {/* Health Tip */}
        <Card className="glass-card border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5">
          <CardContent className="p-6 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-accent/10"><TrendingUp className="w-6 h-6 text-accent" /></div>
            <div><h3 className="font-semibold text-foreground mb-1">Daily Health Tip</h3><p className="text-muted-foreground">Drink at least 8 glasses of water daily to stay hydrated and maintain energy levels.</p></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
