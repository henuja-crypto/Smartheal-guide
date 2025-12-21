import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useLocalStorage, HealthProfile as HealthProfileType } from "@/hooks/useLocalStorage";
import { 
  User, 
  Heart, 
  Activity, 
  AlertCircle, 
  ChevronRight, 
  ChevronLeft,
  Stethoscope,
  Scale,
  Ruler,
  Cigarette,
  Wine,
  Dumbbell,
  Check,
  Sparkles
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const commonConditions = [
  "Diabetes", "Hypertension", "Asthma", "Heart Disease", "Thyroid Disorder",
  "Arthritis", "Migraine", "Allergies", "GERD", "Anemia"
];

const commonAllergies = [
  "Peanuts", "Shellfish", "Dairy", "Gluten", "Eggs", "Soy",
  "Penicillin", "Aspirin", "Latex", "Dust", "Pollen"
];

export default function HealthProfile() {
  const navigate = useNavigate();
  const { profile, saveProfile } = useLocalStorage();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<HealthProfileType>({
    name: "",
    age: 0,
    gender: "other",
    height: 0,
    weight: 0,
    activityLevel: "moderate",
    smokingStatus: "never",
    alcoholConsumption: "none",
    existingConditions: [],
    allergies: [],
    isProfileComplete: false
  });

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const updateField = (field: keyof HealthProfileType, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: "existingConditions" | "allergies", item: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item]
    }));
  };

  const handleSave = () => {
    saveProfile({ ...formData, isProfileComplete: true });
    toast({
      title: "Profile Saved! 🎉",
      description: "Your health profile has been saved successfully.",
    });
    navigate("/");
  };

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 mb-4 shadow-glow">
            <Stethoscope className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Health Profile</h1>
          <p className="text-muted-foreground">Tell us about yourself to personalize your experience</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <Card className="glass-card border-primary/20 animate-fade-in">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-primary/10">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Let's start with the basics</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="bg-background/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    value={formData.age || ""}
                    onChange={(e) => updateField("age", parseInt(e.target.value) || 0)}
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select value={formData.gender} onValueChange={(v) => updateField("gender", v)}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height" className="flex items-center gap-2">
                    <Ruler className="w-4 h-4" /> Height (cm)
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="170"
                    value={formData.height || ""}
                    onChange={(e) => updateField("height", parseInt(e.target.value) || 0)}
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight" className="flex items-center gap-2">
                    <Scale className="w-4 h-4" /> Weight (kg)
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="70"
                    value={formData.weight || ""}
                    onChange={(e) => updateField("weight", parseInt(e.target.value) || 0)}
                    className="bg-background/50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Lifestyle */}
        {step === 2 && (
          <Card className="glass-card border-primary/20 animate-fade-in">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-accent/10">
                  <Activity className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <CardTitle>Lifestyle</CardTitle>
                  <CardDescription>Tell us about your daily habits</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Dumbbell className="w-4 h-4" /> Activity Level
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { value: "sedentary", label: "Sedentary", desc: "Little to no exercise" },
                    { value: "moderate", label: "Moderate", desc: "Exercise 3-4x/week" },
                    { value: "active", label: "Active", desc: "Daily exercise" }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateField("activityLevel", option.value)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        formData.activityLevel === option.value
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <p className="font-medium">{option.label}</p>
                      <p className="text-sm text-muted-foreground">{option.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Cigarette className="w-4 h-4" /> Smoking Status
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  {["never", "former", "current"].map((status) => (
                    <button
                      key={status}
                      onClick={() => updateField("smokingStatus", status)}
                      className={`p-3 rounded-xl border-2 capitalize transition-all ${
                        formData.smokingStatus === status
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Wine className="w-4 h-4" /> Alcohol Consumption
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {["none", "occasional", "moderate", "heavy"].map((level) => (
                    <button
                      key={level}
                      onClick={() => updateField("alcoholConsumption", level)}
                      className={`p-3 rounded-xl border-2 capitalize transition-all ${
                        formData.alcoholConsumption === level
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Medical History */}
        {step === 3 && (
          <Card className="glass-card border-primary/20 animate-fade-in">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-destructive/10">
                  <Heart className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <CardTitle>Medical History</CardTitle>
                  <CardDescription>Select any existing conditions</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {commonConditions.map((condition) => (
                  <Badge
                    key={condition}
                    variant={formData.existingConditions.includes(condition) ? "default" : "outline"}
                    className={`cursor-pointer py-2 px-4 text-sm transition-all ${
                      formData.existingConditions.includes(condition)
                        ? "bg-primary hover:bg-primary/90"
                        : "hover:bg-primary/10"
                    }`}
                    onClick={() => toggleArrayItem("existingConditions", condition)}
                  >
                    {formData.existingConditions.includes(condition) && (
                      <Check className="w-3 h-3 mr-1" />
                    )}
                    {condition}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                {formData.existingConditions.length === 0 
                  ? "No conditions selected" 
                  : `${formData.existingConditions.length} condition(s) selected`}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Allergies */}
        {step === 4 && (
          <Card className="glass-card border-primary/20 animate-fade-in">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-warning/10">
                  <AlertCircle className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <CardTitle>Allergies</CardTitle>
                  <CardDescription>Select any known allergies</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {commonAllergies.map((allergy) => (
                  <Badge
                    key={allergy}
                    variant={formData.allergies.includes(allergy) ? "default" : "outline"}
                    className={`cursor-pointer py-2 px-4 text-sm transition-all ${
                      formData.allergies.includes(allergy)
                        ? "bg-warning text-warning-foreground hover:bg-warning/90"
                        : "hover:bg-warning/10"
                    }`}
                    onClick={() => toggleArrayItem("allergies", allergy)}
                  >
                    {formData.allergies.includes(allergy) && (
                      <Check className="w-3 h-3 mr-1" />
                    )}
                    {allergy}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                {formData.allergies.length === 0 
                  ? "No allergies selected" 
                  : `${formData.allergies.length} allergy(ies) selected`}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setStep(s => s - 1)}
            disabled={step === 1}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </Button>

          {step < totalSteps ? (
            <Button onClick={() => setStep(s => s + 1)} className="gap-2 healix-button">
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={handleSave} className="gap-2 healix-button">
              <Sparkles className="w-4 h-4" /> Complete Profile
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
