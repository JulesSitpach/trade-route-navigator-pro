
import { ScatterChart } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import TariffHeatmap from '../tariff/TariffHeatmap';
import { useLanguage } from '@/contexts/LanguageContext';

const TariffsTab = () => {
  const { t, language } = useLanguage();

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <ScatterChart className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-lg font-medium">{t('tariff.analysis')}</CardTitle>
        </div>
        <CardDescription>
          {language === 'en' 
            ? 'Analyze tariff rates across product categories and countries' 
            : 'Analizar tarifas arancelarias entre categorías de productos y países'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TariffHeatmap />
      </CardContent>
    </Card>
  );
};

export default TariffsTab;
