import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useSymptomHistory, SymptomEntry } from "@/hooks/useLocalStorage";
import { bodyParts, commonSymptoms, findDiseasesBySymptoms, Disease } from "@/data/diseases";
import { 
  Search, 
  Brain, 
  Heart,
  Stethoscope,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Activity,
  Shield,
  Clock,
  ChevronRight
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function SymptomChecker() {
  const navigate = useNavigate();
  const [symptomHistory, setSymptomHistory] = useSymptomHistory();
  const [step, setStep] = useState<"input" | "analyzing" | "results">("input");
  const [selectedBodyParts, setSelectedBodyParts] = useState<string[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [results, setResults] = useState<Disease[]>([]);
  const [analyzeProgress, setAnalyzeProgress] = useState(0);

  const toggleBodyPart = (part: string) => {
    setSelectedBodyParts(prev => 
      prev.includes(part) ? prev.filter(p => p !== part) : [...prev, part]
    );
  };

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    );
  };

  const analyzeSymptoms = async () => {
    if (selectedSymptoms.length === 0) {
      toast({
        title: "Please select symptoms",
        description: "Select at least one symptom to analyze",
        variant: "destructive"
      });
      return;
    }

    setStep("analyzing");
    setAnalyzeProgress(0);

    // Simulate AI analysis with progress
    const interval = setInterval(() => {
      setAnalyzeProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Wait for animation
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Find matching diseases
    const matchedDiseases = findDiseasesBySymptoms(selectedSymptoms);
    setResults(matchedDiseases);

    // Save to history
    const entry: SymptomEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      symptoms: selectedSymptoms,
      bodyParts: selectedBodyParts,
      description: additionalInfo,
      results: matchedDiseases.map(d => d.name)
    };
    setSymptomHistory(prev => [entry, ...prev].slice(0, 50));

    setStep("results");
  };

  const resetChecker = () => {
    setStep("input");
    setSelectedBodyParts([]);
    setSelectedSymptoms([]);
    setAdditionalInfo("");
    setResults([]);
    setAnalyzeProgress(0);
  };

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
      case "low": return <CheckCircle2 className="w-4 h-4" />;
      case "moderate": return <AlertTriangle className="w-4 h-4" />;
      case "high": return <AlertTriangle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent mb-4 shadow-glow">
            <Stethoscope className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Symptom Checker</h1>
          <p className="text-muted-foreground">Describe your symptoms for a preliminary assessment</p>
        </div>

        {/* Disclaimer */}
        <Card className="mb-6 border-warning/30 bg-warning/5">
          <CardContent className="flex items-start gap-3 p-4">
            <Shield className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-warning">Disclaimer:</strong> This tool provides general health information only and is not a substitute for professional medical advice. Always consult a healthcare provider for accurate diagnosis.
            </p>
          </CardContent>
        </Card>

        {/* Input Step */}
        {step === "input" && (
          <div className="space-y-6 animate-fade-in">
            {/* Body Parts Selection */}
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  Where do you feel discomfort?
                </CardTitle>
                <CardDescription>Select affected body areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {bodyParts.map((part) => (
                    <Badge
                      key={part.id}
                      variant={selectedBodyParts.includes(part.id) ? "default" : "outline"}
                      className={`cursor-pointer py-2 px-4 text-sm transition-all ${
                        selectedBodyParts.includes(part.id)
                          ? "bg-primary hover:bg-primary/90"
                          : "hover:bg-primary/10"
                      }`}
                      onClick={() => toggleBodyPart(part.id)}
                    >
                      <span className="mr-2">{part.icon}</span>
                      {part.label}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Symptoms Selection */}
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-accent" />
                  What symptoms are you experiencing?
                </CardTitle>
                <CardDescription>Select all that apply</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {commonSymptoms.map((symptom) => (
                    <Badge
                      key={symptom}
                      variant={selectedSymptoms.includes(symptom) ? "default" : "outline"}
                      className={`cursor-pointer py-2 px-4 text-sm transition-all ${
                        selectedSymptoms.includes(symptom)
                          ? "bg-accent text-accent-foreground hover:bg-accent/90"
                          : "hover:bg-accent/10"
                      }`}
                      onClick={() => toggleSymptom(symptom)}
                    >
                      {symptom}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-primary" />
                  Additional Information
                </CardTitle>
                <CardDescription>Describe how you feel in your own words</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="E.g., I've had a headache for 2 days, it gets worse in the morning..."
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  className="min-h-[120px] bg-background/50"
                />
              </CardContent>
            </Card>

            {/* Analyze Button */}
            <Button 
              onClick={analyzeSymptoms} 
              className="w-full healix-button h-14 text-lg gap-3"
              disabled={selectedSymptoms.length === 0}
            >
              <Sparkles className="w-5 h-5" />
              Analyze Symptoms
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        )}

        {/* Analyzing Step */}
        {step === "analyzing" && (
          <Card className="glass-card border-primary/20 animate-fade-in">
            <CardContent className="py-16 text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mb-6 animate-pulse">
                <Brain className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Analyzing Your Symptoms</h2>
              <p className="text-muted-foreground mb-8">Our AI is reviewing your symptoms...</p>
              <div className="max-w-md mx-auto">
                <Progress value={analyzeProgress} className="h-3 mb-4" />
                <p className="text-sm text-muted-foreground">{analyzeProgress}% Complete</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Step */}
        {step === "results" && (
          <div className="space-y-6 animate-fade-in">
            {/* Summary Card */}
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  Analysis Complete
                </CardTitle>
                <CardDescription>
                  Based on {selectedSymptoms.length} symptoms, we found {results.length} possible condition(s)
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Results List */}
            {results.length > 0 ? (
              <div className="space-y-4">
                {results.slice(0, 5).map((disease, index) => (
                  <Card 
                    key={disease.id} 
                    className="glass-card border-primary/20 hover:border-primary/40 transition-all cursor-pointer"
                    onClick={() => navigate(`/disease/${disease.id}`)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl font-bold text-primary">#{index + 1}</span>
                            <div>
                              <h3 className="text-lg font-semibold">{disease.name}</h3>
                              <p className="text-sm text-muted-foreground capitalize">{disease.type} • {disease.category}</p>
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm mb-3">{disease.description}</p>
                          <div className="flex items-center gap-2">
                            <Badge className={`${getSeverityColor(disease.severity)} border`}>
                              {getSeverityIcon(disease.severity)}
                              <span className="ml-1 capitalize">{disease.severity} Severity</span>
                            </Badge>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="glass-card border-primary/20">
                <CardContent className="py-12 text-center">
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Exact Matches Found</h3>
                  <p className="text-muted-foreground">
                    Your symptoms don't match our database. Please consult a healthcare professional.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="flex gap-4">
              <Button variant="outline" onClick={resetChecker} className="flex-1 gap-2">
                <RefreshCw className="w-4 h-4" /> Check Again
              </Button>
              <Button onClick={() => navigate("/nearby")} className="flex-1 healix-button gap-2">
                <Heart className="w-4 h-4" /> Find Nearby Care
              </Button>
            </div>

            {/* See Doctor Warning */}
            <Card className="border-destructive/30 bg-destructive/5">
              <CardContent className="flex items-start gap-3 p-4">
                <Clock className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-destructive mb-1">When to See a Doctor Immediately</p>
                  <ul className="text-sm text-muted-foreground list-disc list-inside">
                    <li>Severe chest pain or difficulty breathing</li>
                    <li>Sudden weakness or numbness</li>
                    <li>High fever that won't go down</li>
                    <li>Symptoms worsening rapidly</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
