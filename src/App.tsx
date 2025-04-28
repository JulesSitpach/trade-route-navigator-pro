
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChartThemeProvider } from "./components/ui/chart/ChartThemeProvider";
import { LanguageProvider } from "./contexts/LanguageContext";
import { TradeDataProvider } from "./contexts/TradeDataContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import "./i18n/config";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ChartThemeProvider initialMode="light">
          <LanguageProvider>
            <TradeDataProvider>
              <BrowserRouter>
                <Toaster />
                <Sonner />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TradeDataProvider>
          </LanguageProvider>
        </ChartThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
