
import { LineChart } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import SeasonalityGraph from '../SeasonalityGraph';
import { useLanguage } from '@/contexts/LanguageContext';

const SeasonalityTab = () => {
  const { t, language } = useLanguage();

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <LineChart className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-lg font-medium">{t('seasonality.title')}</CardTitle>
        </div>
        <CardDescription>
          {language === 'en' 
            ? 'Track how shipping costs, transit times, and risks fluctuate throughout the year' 
            : 'Seguimiento de cómo los costos de envío, tiempos de tránsito y riesgos fluctúan durante el año'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SeasonalityGraph />
      </CardContent>
    </Card>
  );
};

export default SeasonalityTab;
