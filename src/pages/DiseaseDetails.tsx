import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { internalDiseases, externalDiseases } from "@/data/diseases";
import { 
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  Activity,
  Stethoscope,
  Shield,
  Pill,
  Utensils,
  Clock,
  Ban,
  HeartPulse,
  Lightbulb,
  Hospital
} from "lucide-react";

export default function DiseaseDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const allDiseases = [...internalDiseases, ...externalDiseases];
  const disease = allDiseases.find(d => d.id === id);

  if (!disease) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="glass-card max-w-md w-full text-center p-8">
          <Stethoscope className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Condition Not Found</h2>
          <p className="text-muted-foreground mb-4">The requested health condition could not be found.</p>
          <Button onClick={() => navigate("/library")} className="healix-button">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Library
          </Button>
        </Card>
      </div>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low": return "bg-success/10 text-success border-success/20";
      case "moderate": return "bg-warning/10 text-warning border-warning/20";
      case "high": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "low": return <CheckCircle2 className="w-5 h-5" />;
      case "moderate": return <AlertTriangle className="w-5 h-5" />;
      case "high": return <AlertTriangle className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  const sections = [
    { key: "symptoms", title: "Symptoms", icon: Activity, color: "text-primary" },
    { key: "precautions", title: "Precautions", icon: Shield, color: "text-accent" },
    { key: "temporaryRelief", title: "Temporary Relief", icon: Pill, color: "text-success" },
    { key: "longTermManagement", title: "Long-Term Management", icon: HeartPulse, color: "text-secondary" },
    { key: "dietSuggestions", title: "Diet Suggestions", icon: Utensils, color: "text-warning" },
    { key: "dailyHabits", title: "Daily Habits", icon: Clock, color: "text-info" },
    { key: "whatToAvoid", title: "What to Avoid", icon: Ban, color: "text-destructive" },
    { key: "whenToSeeDoctor", title: "When to See a Doctor", icon: Hospital, color: "text-accent" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-6 gap-2 hover:bg-primary/10"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>

        {/* Header Card */}
        <Card className="glass-card border-primary/20 mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-primary to-accent shadow-glow">
                <Stethoscope className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">{disease.name}</h1>
                  <Badge className={`${getSeverityColor(disease.severity)} border`}>
                    {getSeverityIcon(disease.severity)}
                    <span className="ml-1 capitalize">{disease.severity} Severity</span>
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Badge variant="outline" className="capitalize">{disease.type}</Badge>
                  <span>•</span>
                  <span className="capitalize">{disease.category}</span>
                </div>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <p className="text-muted-foreground leading-relaxed">{disease.description}</p>
          </CardContent>
        </Card>

        {/* Content Sections */}
        <div className="grid gap-4">
          {sections.map(({ key, title, icon: Icon, color }) => {
            const content = disease[key as keyof typeof disease];
            if (!content || (Array.isArray(content) && content.length === 0)) return null;

            return (
              <Card key={key} className="glass-card border-primary/10">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className={`p-2 rounded-lg bg-current/10 ${color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {Array.isArray(content) ? (
                    <ul className="space-y-2">
                      {content.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-current ${color}`} />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">{content}</p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Disclaimer */}
        <Card className="mt-6 border-warning/30 bg-warning/5">
          <CardContent className="flex items-start gap-3 p-4">
            <Lightbulb className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-warning">Note:</strong> This information is for educational purposes only. It is not intended to replace professional medical advice, diagnosis, or treatment. Always consult your healthcare provider for personalized medical guidance.
            </p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Button 
            variant="outline" 
            className="flex-1 gap-2"
            onClick={() => navigate("/symptom-checker")}
          >
            <Activity className="w-4 h-4" /> Check Symptoms
          </Button>
          <Button 
            className="flex-1 healix-button gap-2"
            onClick={() => navigate("/nearby")}
          >
            <Hospital className="w-4 h-4" /> Find Nearby Care
          </Button>
        </div>
      </div>
    </div>
  );
}
