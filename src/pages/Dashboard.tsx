import { Link } from 'react-router-dom';
import { 
  Stethoscope, 
  BookOpen, 
  Target, 
  MapPin, 
  TrendingUp,
  Activity,
  Droplets,
  Footprints,
  AlertCircle,
  ChevronRight,
  Sparkles,
  User
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useHealthProfile, useDailyGoals, useSymptomHistory } from '@/hooks/useLocalStorage';
import { AppLayout } from '@/components/layout/AppLayout';

export default function Dashboard() {
  const [profile] = useHealthProfile();
  const [goals] = useDailyGoals();
  const [history] = useSymptomHistory();

  const recentHistory = history.slice(0, 3);
  const totalGoalProgress = goals.goals.reduce((acc, goal) => {
    return acc + Math.min((goal.current / goal.target) * 100, 100);
  }, 0) / goals.goals.length;

  const quickActions = [
    { 
      label: 'Symptom Checker', 
      icon: Stethoscope, 
      path: '/symptom-checker',
      color: 'bg-primary/10 text-primary',
      description: 'Check your symptoms'
    },
    { 
      label: 'Health Library', 
      icon: BookOpen, 
      path: '/diseases',
      color: 'bg-healix-blue/10 text-healix-blue',
      description: 'Browse conditions'
    },
    { 
      label: 'Daily Goals', 
      icon: Target, 
      path: '/goals',
      color: 'bg-healix-success/10 text-healix-success',
      description: 'Track your progress'
    },
    { 
      label: 'Nearby Care', 
      icon: MapPin, 
      path: '/nearby',
      color: 'bg-healix-purple/10 text-healix-purple',
      description: 'Find hospitals'
    },
  ];

  return (
    <AppLayout>
      <div className="p-4 lg:p-8 space-y-6 animate-fade-in">
        {/* Welcome Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-healix p-6 lg:p-8 text-primary-foreground">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium opacity-90">Welcome back</span>
            </div>
            <h1 className="font-display text-2xl lg:text-3xl font-bold mb-2">
              {profile.name || 'Health Explorer'}!
            </h1>
            <p className="opacity-80 max-w-md">
              Your daily health companion is here to help you stay informed and healthy.
            </p>

            {!profile.isProfileComplete && (
              <Link to="/profile">
                <Button 
                  variant="secondary" 
                  className="mt-4 bg-white/20 hover:bg-white/30 text-primary-foreground border-0"
                >
                  <User className="w-4 h-4 mr-2" />
                  Complete Your Profile
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.path} to={action.path}>
                <Card className="glass-card-hover h-full cursor-pointer">
                  <CardContent className="p-4 lg:p-6 flex flex-col items-center text-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl ${action.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm lg:text-base">{action.label}</h3>
                      <p className="text-xs text-muted-foreground hidden lg:block mt-1">
                        {action.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Daily Goals Progress */}
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Today's Progress
              </CardTitle>
              <Link to="/goals">
                <Button variant="ghost" size="sm">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{Math.round(totalGoalProgress)}%</span>
                <span className="text-sm text-muted-foreground">
                  {goals.streak} day streak 🔥
                </span>
              </div>
              <Progress value={totalGoalProgress} className="h-3" />
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                {goals.goals.slice(0, 4).map((goal) => {
                  const progress = Math.min((goal.current / goal.target) * 100, 100);
                  const icons: Record<string, any> = {
                    water: Droplets,
                    steps: Footprints,
                  };
                  const Icon = icons[goal.type] || Target;
                  
                  return (
                    <div key={goal.id} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                        <Icon className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground">{goal.label}</p>
                        <p className="text-sm font-medium">
                          {goal.current}/{goal.target} {goal.unit}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Symptom History */}
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Recent Activity
              </CardTitle>
              <Link to="/symptom-checker">
                <Button variant="ghost" size="sm">
                  Check Now <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {recentHistory.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <AlertCircle className="w-10 h-10 mx-auto mb-3 opacity-50" />
                  <p>No symptom checks yet</p>
                  <p className="text-sm">Use the symptom checker to get started</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentHistory.map((entry) => (
                    <div key={entry.id} className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Stethoscope className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {entry.symptoms.slice(0, 2).join(', ')}
                          {entry.symptoms.length > 2 && ` +${entry.symptoms.length - 2} more`}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(entry.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Health Tips */}
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-healix-warning/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-healix-warning" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Health Tip of the Day</h3>
                <p className="text-sm text-muted-foreground">
                  Stay hydrated! Drinking at least 8 glasses of water daily helps maintain energy levels, 
                  supports digestion, and keeps your skin healthy. Set reminders to drink water throughout the day.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
