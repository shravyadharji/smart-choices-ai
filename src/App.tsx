import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Assessment from "./pages/Assessment";
import Recommendations from "./pages/Recommendations";
import CareerComparison from "./pages/CareerComparison";
import CollegeComparison from "./pages/CollegeComparison";
import Roadmap from "./pages/Roadmap";
import Trends from "./pages/Trends";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/career-comparison" element={<CareerComparison />} />
          <Route path="/college-comparison" element={<CollegeComparison />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
