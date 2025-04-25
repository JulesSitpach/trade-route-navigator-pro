
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useTariffData } from './tariff/useTariffData';
import TariffScatterChart from './tariff/TariffScatterChart';
import TariffInsights from './tariff/TariffInsights';
import { TableIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const TariffHeatmap = () => {
  const { tariffData, getTariffColor } = useTariffData();
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <TableIcon className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-medium">
          {language === 'en' ? 'Tariff Analysis by Country' : 'Análisis de Aranceles por País'}
        </h3>
      </div>
      <p className="text-sm text-muted-foreground">
        {language === 'en' 
          ? 'Visualize tariff rates across different countries to identify optimal trade routes'
          : 'Visualice las tasas arancelarias en diferentes países para identificar rutas comerciales óptimas'
        }
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <TariffScatterChart data={tariffData} getTariffColor={getTariffColor} />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <TariffInsights />
        </div>
      </div>
    </div>
  );
};

export default TariffHeatmap;
