import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useHealthProfile, useTheme, useLocalStorage } from "@/hooks/useLocalStorage";
import { 
  Settings as SettingsIcon,
  Moon,
  Sun,
  Bell,
  Globe,
  Trash2,
  User,
  Shield,
  HelpCircle,
  FileText,
  Heart,
  ChevronRight,
  Palette,
  Volume2,
  Smartphone,
  Info
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Settings() {
  const navigate = useNavigate();
  const [profile] = useHealthProfile();
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [language, setLanguage] = useState("en");

  const handleClearData = () => {
    if (confirm("Are you sure you want to clear all your data? This action cannot be undone.")) {
      localStorage.removeItem("healix-profile");
      localStorage.removeItem("healix-symptom-history");
      localStorage.removeItem("healix-daily-goals");
      toast({
        title: "Data Cleared",
        description: "All your local data has been removed"
      });
      navigate("/");
    }
  };

  const settingsSections = [
    {
      title: "Appearance",
      icon: Palette,
      items: [
        {
          id: "theme",
          label: "Dark Mode",
          description: "Switch between light and dark themes",
          icon: theme === "dark" ? Moon : Sun,
          type: "switch" as const,
          value: theme === "dark",
          onChange: () => setTheme(theme === "dark" ? "light" : "dark")
        }
      ]
    },
    {
      title: "Notifications",
      icon: Bell,
      items: [
        {
          id: "push",
          label: "Push Notifications",
          description: "Receive reminders for your health goals",
          icon: Bell,
          type: "switch" as const,
          value: notifications,
          onChange: () => setNotifications(!notifications)
        },
        {
          id: "sounds",
          label: "Sound Effects",
          description: "Play sounds for achievements",
          icon: Volume2,
          type: "switch" as const,
          value: soundEffects,
          onChange: () => setSoundEffects(!soundEffects)
        }
      ]
    },
    {
      title: "General",
      icon: SettingsIcon,
      items: [
        {
          id: "language",
          label: "Language",
          description: "Choose your preferred language",
          icon: Globe,
          type: "select" as const,
          value: language,
          options: [
            { value: "en", label: "English" },
            { value: "es", label: "Español" },
            { value: "fr", label: "Français" },
            { value: "de", label: "Deutsch" }
          ],
          onChange: (val: string) => setLanguage(val)
        }
      ]
    }
  ];

  const quickLinks = [
    { label: "Edit Profile", icon: User, path: "/profile" },
    { label: "Health Library", icon: FileText, path: "/library" },
    { label: "Privacy Policy", icon: Shield, path: "#" },
    { label: "Help Center", icon: HelpCircle, path: "#" },
    { label: "About HealixCare", icon: Info, path: "#" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary mb-4 shadow-glow">
            <SettingsIcon className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Customize your HealixCare experience</p>
        </div>

        {/* Profile Card */}
        {profile && profile.isProfileComplete && (
          <Card className="glass-card border-primary/20 mb-6">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-primary-foreground">
                  {profile.name ? profile.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-foreground">{profile.name || "User"}</h3>
                  <p className="text-sm text-muted-foreground">
                    {profile.age} years old • {profile.gender}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {profile.existingConditions.length} conditions • {profile.allergies.length} allergies
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate("/profile")}>
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Settings Sections */}
        {settingsSections.map((section) => (
          <Card key={section.title} className="glass-card border-primary/20 mb-4">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <section.icon className="w-5 h-5 text-primary" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {section.items.map((item, index) => (
                <div key={item.id}>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-muted">
                        <item.icon className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    {item.type === "switch" && (
                      <Switch 
                        checked={item.value as boolean} 
                        onCheckedChange={item.onChange as () => void}
                      />
                    )}
                    {item.type === "select" && (
                      <Select value={item.value as string} onValueChange={item.onChange as (val: string) => void}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {item.options?.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                  {index < section.items.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}

        {/* Quick Links */}
        <Card className="glass-card border-primary/20 mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Smartphone className="w-5 h-5 text-primary" />
              Quick Links
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            {quickLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => link.path !== "#" && navigate(link.path)}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <link.icon className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground">{link.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive/30 bg-destructive/5">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg text-destructive">
              <Trash2 className="w-5 h-5" />
              Danger Zone
            </CardTitle>
            <CardDescription>Irreversible actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Clear All Data</p>
                <p className="text-sm text-muted-foreground">Delete all your health data from this device</p>
              </div>
              <Button variant="destructive" onClick={handleClearData}>
                Clear Data
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* App Info */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Heart className="w-4 h-4 text-primary" />
            <span className="font-semibold">HealixCare</span>
          </div>
          <p>Version 1.0.0</p>
          <p className="mt-1">Made with ❤️ for your health</p>
        </div>
      </div>
    </div>
  );
}
