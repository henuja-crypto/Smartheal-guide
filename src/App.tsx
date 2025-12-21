import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import HealthProfile from "./pages/HealthProfile";
import SymptomChecker from "./pages/SymptomChecker";
import DiseaseLibrary from "./pages/DiseaseLibrary";
import DiseaseDetails from "./pages/DiseaseDetails";
import DailyGoals from "./pages/DailyGoals";
import NearbyHospitals from "./pages/NearbyHospitals";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<HealthProfile />} />
            <Route path="/symptom-checker" element={<SymptomChecker />} />
            <Route path="/library" element={<DiseaseLibrary />} />
            <Route path="/library/:type" element={<DiseaseLibrary />} />
            <Route path="/disease/:id" element={<DiseaseDetails />} />
            <Route path="/goals" element={<DailyGoals />} />
            <Route path="/nearby" element={<NearbyHospitals />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
