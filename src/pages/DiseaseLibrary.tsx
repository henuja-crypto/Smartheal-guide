import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { internalDiseases, externalDiseases, Disease } from "@/data/diseases";
import { 
  Search, 
  Heart, 
  Stethoscope,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Activity,
  Sparkles,
  Filter,
  X
} from "lucide-react";

export default function DiseaseLibrary() {
  const navigate = useNavigate();
  const { type } = useParams<{ type: "internal" | "external" }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>(type || "internal");

  const diseases = activeTab === "internal" ? internalDiseases : externalDiseases;

  const categories = useMemo(() => {
    const cats = new Set(diseases.map(d => d.category));
    return Array.from(cats);
  }, [diseases]);

  const filteredDiseases = useMemo(() => {
    return diseases.filter(disease => {
      const matchesSearch = disease.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        disease.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        disease.symptoms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = !selectedCategory || disease.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [diseases, searchQuery, selectedCategory]);

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
      case "low": return <CheckCircle2 className="w-3 h-3" />;
      case "moderate": return <AlertTriangle className="w-3 h-3" />;
      case "high": return <AlertTriangle className="w-3 h-3" />;
      default: return <Activity className="w-3 h-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary mb-4 shadow-glow">
            <Stethoscope className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Health Library</h1>
          <p className="text-muted-foreground">Explore comprehensive information about various health conditions</p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-2 h-14">
            <TabsTrigger value="internal" className="text-base gap-2">
              <Heart className="w-4 h-4" />
              Internal Disorders
            </TabsTrigger>
            <TabsTrigger value="external" className="text-base gap-2">
              <Sparkles className="w-4 h-4" />
              External Disorders
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search conditions, symptoms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-background/50"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className="gap-1"
            >
              <Filter className="w-4 h-4" /> All
            </Button>
            {categories.slice(0, 5).map(cat => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Active Filter Badge */}
        {selectedCategory && (
          <div className="mb-4">
            <Badge variant="secondary" className="gap-1 py-1 px-3">
              {selectedCategory}
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => setSelectedCategory(null)} 
              />
            </Badge>
          </div>
        )}

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-4">
          Showing {filteredDiseases.length} of {diseases.length} conditions
        </p>

        {/* Disease Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDiseases.map((disease) => (
            <Card 
              key={disease.id}
              className="glass-card border-primary/10 hover:border-primary/30 transition-all cursor-pointer group"
              onClick={() => navigate(`/disease/${disease.id}`)}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {disease.name}
                    </h3>
                    <p className="text-xs text-muted-foreground capitalize">{disease.category}</p>
                  </div>
                  <Badge className={`${getSeverityColor(disease.severity)} border text-xs`}>
                    {getSeverityIcon(disease.severity)}
                    <span className="ml-1 capitalize">{disease.severity}</span>
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {disease.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {disease.symptoms.slice(0, 3).map((symptom, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {symptom}
                    </Badge>
                  ))}
                  {disease.symptoms.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{disease.symptoms.length - 3} more
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-end mt-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm">View Details</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredDiseases.length === 0 && (
          <Card className="glass-card border-primary/20">
            <CardContent className="py-12 text-center">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Conditions Found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
