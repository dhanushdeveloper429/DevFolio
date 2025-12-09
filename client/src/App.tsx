import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/theme-context";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import { useThemeLogic } from "@/hooks/use-theme-logic";
import { WeatherWidget } from "@/components/weather-widget";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { theme } = useThemeLogic();
  return (
    <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
      {theme === 'christmas' && (
        <>
          <div className="christmas-lights">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="light-bulb"></div>
            ))}
          </div>
        </>
      )}
      <WeatherWidget />
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
