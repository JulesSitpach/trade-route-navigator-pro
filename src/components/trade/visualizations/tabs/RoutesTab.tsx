
import { BarChart } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import RouteComparisonTimeline from '../RouteComparisonTimeline';
import { useLanguage } from '@/contexts/LanguageContext';
import { Route } from '../../types';

interface RoutesTabProps {
  routes: Route[];
}

const RoutesTab = ({ routes }: RoutesTabProps) => {
  const { language } = useLanguage();

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BarChart className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-lg font-medium">
            {language === 'en' ? 'Route Comparison' : 'Comparación de Rutas'}
          </CardTitle>
        </div>
        <CardDescription>
          {language === 'en' 
            ? 'Compare transit times across different shipping routes and methods' 
            : 'Compare tiempos de tránsito entre diferentes rutas y métodos de envío'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RouteComparisonTimeline routes={routes} />
      </CardContent>
    </Card>
  );
};

export default RoutesTab;
