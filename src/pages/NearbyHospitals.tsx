import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  MapPin, 
  Phone, 
  Clock, 
  Navigation,
  Hospital,
  Stethoscope,
  Heart,
  AlertCircle,
  Search,
  Star,
  ExternalLink,
  Ambulance,
  Shield
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface HealthFacility {
  id: string;
  name: string;
  type: "hospital" | "clinic" | "pharmacy" | "emergency";
  address: string;
  distance: string;
  phone: string;
  hours: string;
  rating: number;
  isOpen: boolean;
}

const mockFacilities: HealthFacility[] = [
  {
    id: "1",
    name: "City General Hospital",
    type: "hospital",
    address: "123 Healthcare Avenue",
    distance: "0.8 km",
    phone: "+1 (555) 123-4567",
    hours: "24/7",
    rating: 4.5,
    isOpen: true
  },
  {
    id: "2",
    name: "QuickCare Clinic",
    type: "clinic",
    address: "456 Wellness Street",
    distance: "1.2 km",
    phone: "+1 (555) 234-5678",
    hours: "8:00 AM - 8:00 PM",
    rating: 4.2,
    isOpen: true
  },
  {
    id: "3",
    name: "MedPlus Pharmacy",
    type: "pharmacy",
    address: "789 Health Lane",
    distance: "0.5 km",
    phone: "+1 (555) 345-6789",
    hours: "9:00 AM - 10:00 PM",
    rating: 4.0,
    isOpen: true
  },
  {
    id: "4",
    name: "Emergency Care Center",
    type: "emergency",
    address: "321 Urgent Way",
    distance: "2.1 km",
    phone: "+1 (555) 911-0000",
    hours: "24/7",
    rating: 4.8,
    isOpen: true
  },
  {
    id: "5",
    name: "Family Health Clinic",
    type: "clinic",
    address: "555 Care Boulevard",
    distance: "1.8 km",
    phone: "+1 (555) 456-7890",
    hours: "7:00 AM - 6:00 PM",
    rating: 4.3,
    isOpen: false
  },
  {
    id: "6",
    name: "Sunrise Medical Center",
    type: "hospital",
    address: "888 Medical Drive",
    distance: "3.2 km",
    phone: "+1 (555) 567-8901",
    hours: "24/7",
    rating: 4.6,
    isOpen: true
  }
];

const emergencyContacts = [
  { name: "Emergency Services", number: "911", icon: Ambulance },
  { name: "Poison Control", number: "1-800-222-1222", icon: AlertCircle },
  { name: "Mental Health Hotline", number: "988", icon: Heart }
];

const typeConfig: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
  hospital: { icon: <Hospital className="w-5 h-5" />, color: "bg-blue-500", label: "Hospital" },
  clinic: { icon: <Stethoscope className="w-5 h-5" />, color: "bg-green-500", label: "Clinic" },
  pharmacy: { icon: <Shield className="w-5 h-5" />, color: "bg-purple-500", label: "Pharmacy" },
  emergency: { icon: <Ambulance className="w-5 h-5" />, color: "bg-red-500", label: "Emergency" }
};

export default function NearbyHospitals() {
  const [searchQuery, setSearchQuery] = useState("");
  const [facilities, setFacilities] = useState<HealthFacility[]>(mockFacilities);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [locationStatus, setLocationStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const requestLocation = () => {
    setLocationStatus("loading");
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationStatus("success");
          toast({
            title: "Location Found",
            description: "Showing healthcare facilities near you"
          });
        },
        (error) => {
          setLocationStatus("error");
          toast({
            title: "Location Access Denied",
            description: "Showing sample facilities instead",
            variant: "destructive"
          });
        }
      );
    } else {
      setLocationStatus("error");
      toast({
        title: "Location Not Supported",
        description: "Your browser doesn't support geolocation",
        variant: "destructive"
      });
    }
  };

  const filteredFacilities = facilities.filter(facility => {
    const matchesSearch = facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facility.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || facility.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-destructive to-destructive/60 mb-4 shadow-glow">
            <Hospital className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Nearby Care</h1>
          <p className="text-muted-foreground">Find hospitals, clinics, and pharmacies near you</p>
        </div>

        {/* Emergency Contacts */}
        <Card className="mb-6 border-destructive/30 bg-destructive/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg text-destructive">
              <AlertCircle className="w-5 h-5" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {emergencyContacts.map((contact) => (
                <a
                  key={contact.name}
                  href={`tel:${contact.number}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-background/50 hover:bg-background transition-colors"
                >
                  <div className="p-2 rounded-lg bg-destructive/10">
                    <contact.icon className="w-5 h-5 text-destructive" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{contact.name}</p>
                    <p className="text-destructive font-bold">{contact.number}</p>
                  </div>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Location Button */}
        <Card className="mb-6 glass-card border-primary/20">
          <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary/10">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Enable Location</p>
                <p className="text-sm text-muted-foreground">Find the nearest healthcare facilities</p>
              </div>
            </div>
            <Button 
              onClick={requestLocation}
              disabled={locationStatus === "loading"}
              className="healix-button gap-2"
            >
              <Navigation className="w-4 h-4" />
              {locationStatus === "loading" ? "Locating..." : "Use My Location"}
            </Button>
          </CardContent>
        </Card>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search facilities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-background/50"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedType === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(null)}
            >
              All
            </Button>
            {Object.entries(typeConfig).map(([type, config]) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type)}
                className="gap-1"
              >
                {config.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Facilities List */}
        <div className="space-y-4">
          {filteredFacilities.map((facility) => {
            const config = typeConfig[facility.type];
            
            return (
              <Card 
                key={facility.id}
                className="glass-card border-primary/10 hover:border-primary/30 transition-all"
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${config.color} text-white flex-shrink-0`}>
                      {config.icon}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-semibold text-foreground">{facility.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant="outline" className="text-xs">{config.label}</Badge>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {facility.distance}
                            </span>
                          </div>
                        </div>
                        <Badge 
                          className={facility.isOpen ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}
                        >
                          {facility.isOpen ? "Open" : "Closed"}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">{facility.address}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {facility.hours}
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Star className="w-4 h-4 text-yellow-400" />
                          {facility.rating}
                        </span>
                        <a 
                          href={`tel:${facility.phone}`}
                          className="flex items-center gap-1 text-primary hover:underline"
                        >
                          <Phone className="w-4 h-4" />
                          {facility.phone}
                        </a>
                      </div>
                    </div>

                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-1 flex-shrink-0"
                      onClick={() => {
                        window.open(
                          `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(facility.address)}`,
                          '_blank'
                        );
                      }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* No Results */}
        {filteredFacilities.length === 0 && (
          <Card className="glass-card border-primary/20">
            <CardContent className="py-12 text-center">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Facilities Found</h3>
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
